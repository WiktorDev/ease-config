#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const load_configs_1 = require("./load-configs");
const generate_1 = require("./generate");
function main() {
    const projectRoot = process.cwd();
    const configDir = path_1.default.join(projectRoot, 'config');
    const configs = (0, load_configs_1.loadConfigs)(configDir);
    (0, generate_1.generateTypes)(configs, projectRoot);
}
main();
//# sourceMappingURL=cli.js.map