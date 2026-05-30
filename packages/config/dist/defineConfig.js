"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineConfig = defineConfig;
/**
 * Use in your config/*.ts files to define typed configuration.
 *
 * @example
 * // config/app.ts
 * import { defineConfig } from "@mylib/core";
 * export default defineConfig({ port: 3000, host: "localhost" });
 */
function defineConfig(config) {
    return {
        __brand: "ConfigDefinition",
        value: config,
    };
}
//# sourceMappingURL=defineConfig.js.map