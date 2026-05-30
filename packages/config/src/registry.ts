import path from "path";
import fs from "fs";
import requireTs from "./helpers/require-ts";
import {easeConfig} from "./ease-config";

const configRegistry = new Map<string, Record<string, unknown>>();
let loaded = false;

export function loadAllConfigs(): void {
  if (loaded) return;
  loaded = true;

  const configDir = path.join(process.cwd(), "config");

  if (!fs.existsSync(configDir)) {
    return easeConfig.throw(`config/ directory not found at: ${configDir}\nCreate a config/ folder in your project root.`);
  }

  const tsFiles = fs.readdirSync(configDir).filter((f) => f.endsWith(".ts") && !f.endsWith(".d.ts"));
  const jsFiles = fs.readdirSync(configDir).filter((f) => f.endsWith(".js"));

  const useTs = tsFiles.length > 0;
  const files = useTs ? tsFiles : jsFiles;

  if (files.length === 0) {
    return easeConfig.throw(`No config files found in ${configDir}\nCreate .ts files in the config/ folder.`);
  }

  for (const file of files) {
    const ext = path.extname(file);
    const namespace = path.basename(file, ext);
    const filePath = path.join(configDir, file);

    try {
      const mod = useTs ? requireTs(filePath) : (() => {
        delete require.cache[require.resolve(filePath)];
        return require(filePath) as Record<string, unknown>;
      })();

      const raw = mod?.default ?? mod;

      const values =
          raw &&
          typeof raw === "object" &&
          (raw as Record<string, unknown>).__brand === "ConfigDefinition"
              ? (raw as { value: Record<string, unknown> }).value
              : (raw as Record<string, unknown>);

      configRegistry.set(namespace, values);
      easeConfig.log(`Loaded config namespace "${namespace}"`);
    } catch (err) {
      return easeConfig.throw(`Failed to load config/${file}:\n${err}`);    }
  }
}

export function getNamespace(namespace: string): Record<string, unknown> {
  if (!loaded) loadAllConfigs();
  const ns = configRegistry.get(namespace);
  if (!ns) {
    return easeConfig.throw(`No config namespace "${namespace}".\nMake sure config/${namespace}.ts exists and you ran: npx ease-config generate`);
  }
  return ns;
}
