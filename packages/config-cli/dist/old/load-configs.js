"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfigs = loadConfigs;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function loadConfigs(configDir) {
    const files = fs_1.default.readdirSync(configDir);
    const configs = {};
    for (const file of files) {
        const fullPath = path_1.default.join(configDir, file);
        // skip folders
        const stat = fs_1.default.statSync(fullPath);
        if (!stat.isFile())
            continue;
        // skip non ts/js
        if (!file.endsWith('.ts') && !file.endsWith('.js'))
            continue;
        const mod = require(fullPath);
        // app.ts → app
        const name = path_1.default.basename(file, path_1.default.extname(file));
        configs[name] = mod.default ?? mod;
    }
    return configs;
}
//# sourceMappingURL=load-configs.js.map