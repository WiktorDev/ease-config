#!/usr/bin/env node
import path from "path";
import { generate } from "./generator";

const args = process.argv.slice(2);
const command = args[0];

const projectRoot = process.cwd();

async function main() {
  switch (command) {
    case "generate":
    case "gen": {
      // Allow custom config dir: ease-config generate --config ./my-config
      const configFlagIdx = args.indexOf("--config");
      const configDir = configFlagIdx !== -1 && args[configFlagIdx + 1]
          ? path.resolve(projectRoot, args[configFlagIdx + 1])
          : path.join(projectRoot, "config");
      await generate({ projectRoot, configDir });
      break;
    }

    case "help":
    case "--help":
    case "-h":
    default:
      printHelp();
  }
}

function printHelp() {
  console.log(`
@ease/config-cli — config generator

USAGE
  npx ease-config <command> [options]

COMMANDS
  generate        Scan config/ and generate types + runtime into @ease/config
  gen             Alias for generate

OPTIONS
  --config <dir>  Path to config directory (default: ./config)

EXAMPLES
  npx ease-config generate
  npx ease-config generate --config ./src/config
`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
