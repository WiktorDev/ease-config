import type { AllConfigs } from "./config.generated";
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
export declare const config: AllConfigs;
//# sourceMappingURL=config.d.ts.map