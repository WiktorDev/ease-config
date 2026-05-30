#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const generator_1 = require("./generator");
const args = process.argv.slice(2);
const command = args[0];
const projectRoot = process.cwd();
async function main() {
    switch (command) {
        case "generate":
        case "gen": {
            // Allow custom config dir: mylib generate --config ./my-config
            const configFlagIdx = args.indexOf("--config");
            const configDir = configFlagIdx !== -1 && args[configFlagIdx + 1]
                ? path_1.default.resolve(projectRoot, args[configFlagIdx + 1])
                : path_1.default.join(projectRoot, "config");
            await (0, generator_1.generate)({ projectRoot, configDir });
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
@mylib/cli — config generator

USAGE
  npx mylib <command> [options]

COMMANDS
  generate        Scan config/ and generate types + runtime into @mylib/core
  gen             Alias for generate

OPTIONS
  --config <dir>  Path to config directory (default: ./config)

EXAMPLES
  npx mylib generate
  npx mylib generate --config ./src/config
`);
}
main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
});
//# sourceMappingURL=bin.js.map