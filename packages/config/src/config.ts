import { getNamespace } from "./registry";
import {easeConfig} from "./ease-config";

// Typ config pochodzi z dist/index.d.ts nadpisywanego przez CLI.
// W runtime to Proxy które sięga do configRegistry.
function createConfigProxy(): any {
  return new Proxy({} as any, {
    get(_target, namespace: string | symbol) {
      if (typeof namespace !== "string") return undefined;

      const ns = getNamespace(namespace);

      return new Proxy({} as any, {
        get(_t, key: string | symbol) {
          if (typeof key !== "string") return undefined;
          if (!(key in ns)) {
            return easeConfig.throw(`config.${namespace}.${key} does not exist.`)
          }
          return ns[key];
        },
        has(_t, key) {
          return typeof key === "string" && key in ns;
        },
        ownKeys() {
          return Object.keys(ns);
        },
        getOwnPropertyDescriptor(_t, key) {
          if (typeof key === "string" && key in ns) {
            return { configurable: true, enumerable: true, value: ns[key] };
          }
          return undefined;
        },
      });
    },
  });
}

/**
 * Sync config accessor
 * Type (dist/index.d.ts) is generating via `npx ease-config generate`.
 *
 * @example
 * import { config } from "@ease-lab/config";
 *
 * config.main.port   // number  (from env("PORT", 3000))
 * config.db.host     // string  (from env("DB_HOST", "localhost"))
 */
export const config: any = createConfigProxy();
