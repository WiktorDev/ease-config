"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function createConfigProxy() {
    const cache = {};
    const generatedDir = path_1.default.resolve(__dirname, "..", "generated");
    function loadNamespace(name) {
        if (cache[name])
            return cache[name];
        const filePath = path_1.default.join(generatedDir, `${name}.js`);
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error(`[mylib] No generated config for namespace "${name}".\n` +
                `Run: npx mylib generate`);
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        cache[name] = require(filePath);
        return cache[name];
    }
    return new Proxy({}, {
        get(_target, namespace) {
            if (typeof namespace !== "string")
                return undefined;
            const ns = loadNamespace(namespace);
            return new Proxy({}, {
                get(_t, key) {
                    if (typeof key !== "string")
                        return undefined;
                    if (!(key in ns)) {
                        throw new Error(`[mylib] config.${namespace}.${key} does not exist.`);
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
 * Synchroniczny accessor do konfiguracji — typ pochodzi wprost z AllConfigs,
 * generowanego przez `npx mylib generate` na podstawie plików config/*.ts
 *
 * @example
 * import { config } from "@mylib/core";
 *
 * config.app.port   // type: 3000        (literał z config/app.ts)
 * config.db.host    // type: "127.0.0.1"
 * config.app.wtf    // ✗ TS error: Property 'wtf' does not exist on AllConfigs["app"]
 */
exports.config = createConfigProxy();
//# sourceMappingURL=config.js.map