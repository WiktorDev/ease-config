"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTypes = generateTypes;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const to_type_1 = require("./to-type");
function generateTypes(configs, projectRoot) {
    console.log(projectRoot);
    const outDir = path_1.default.join(projectRoot, 'node_modules', '@nest-ease', 'config', 'generated');
    fs_1.default.mkdirSync(outDir, { recursive: true });
    const file = path_1.default.join(outDir, 'index.d.ts');
    let content = `
export type ConfigMap = {
`;
    for (const [key, value] of Object.entries(configs)) {
        content += `  ${key}: ${(0, to_type_1.toType)(value)};\n`;
    }
    content += `
};

export declare const config: ConfigMap;
`;
    fs_1.default.writeFileSync(file, content);
    console.log(content);
    console.log('✔ generated in ' + file);
}
//# sourceMappingURL=generate.js.map