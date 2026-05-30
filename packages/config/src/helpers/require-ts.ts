import path from "path";
import fs from "fs";
import os from "os";
import {easeConfig} from "../ease-config";

export default function(filePath: string): Record<string, unknown> {
  const tmpFile = path.join(
      os.tmpdir(),
      `ease-config-${Date.now()}-${Math.random().toString(36).slice(2)}-${path.basename(filePath, ".ts")}.cjs`
  );

  try {
    const { buildSync } = require("esbuild") as typeof import("esbuild");
    buildSync({
      entryPoints: [filePath],
      bundle: true,
      platform: "node",
      format: "cjs",
      outfile: tmpFile,
      external: [
        "@nestjs/*",
        "reflect-metadata",
        "rxjs",
        "class-transformer",
        "class-validator",
      ],
      logLevel: "silent",
    });
  } catch (err) {
    return easeConfig.throw(
        `Failed to compile ${path.basename(filePath)}.\n` +
        `Make sure esbuild is installed: npm install --save-dev esbuild\n${err}`
    );
  }

  try {
    delete require.cache[tmpFile];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require(tmpFile) as Record<string, unknown>;
  } finally {
    try { fs.unlinkSync(tmpFile); } catch { /* ignore */ }
  }
}