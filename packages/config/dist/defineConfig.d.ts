/**
 * Marks a config object as a validated config definition.
 * The CLI reads these files and generates typed accessors.
 */
export interface ConfigDefinition<T extends Record<string, unknown>> {
    readonly __brand: "ConfigDefinition";
    readonly value: T;
}
/**
 * Use in your config/*.ts files to define typed configuration.
 *
 * @example
 * // config/app.ts
 * import { defineConfig } from "@mylib/core";
 * export default defineConfig({ port: 3000, host: "localhost" });
 */
export declare function defineConfig<T extends Record<string, unknown>>(config: T): ConfigDefinition<T>;
//# sourceMappingURL=defineConfig.d.ts.map