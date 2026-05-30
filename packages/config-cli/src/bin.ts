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
      const configDir = path.join(projectRoot, "config");
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

EXAMPLES
  npx ease-config generate
`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
