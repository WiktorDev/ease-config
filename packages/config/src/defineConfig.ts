export interface ConfigDefinition<T extends Record<string, unknown>> {
  readonly __brand: "ConfigDefinition";
  readonly value: T;
}

/**
 * @example
 * import { defineConfig, env } from "@ease-config/config";
 *
 * export default defineConfig({
 *   port:  env("PORT", 3000),        // number
 *   host:  env("HOST", "localhost"), // string
 *   debug: env("DEBUG", false),      // boolean
 *   name:  "my-app",                 // const
 * });
 */
export function defineConfig<T extends Record<string, unknown>>(
    config: T
): ConfigDefinition<T> {
  return { __brand: "ConfigDefinition", value: config };
}
