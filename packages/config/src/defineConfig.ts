export interface ConfigDefinition<T extends Record<string, unknown>> {
  readonly __brand: "ConfigDefinition";
  readonly value: T;
}

/**
 * Use in your config/*.ts files to define typed configuration.
 *
 * @example
 * // config/app.ts
 * import { defineConfig } from "@ease/config";
 * export default defineConfig({ port: 3000, host: "localhost" });
 */
export function defineConfig<T extends Record<string, unknown>>(config: T): ConfigDefinition<T> {
  return {
    __brand: "ConfigDefinition",
    value: config,
  };
}
