import dotenv from "dotenv";
import path from "path";
import {easeConfig} from "./ease-config";

const root = process.cwd();
const nodeEnv = process.env["NODE_ENV"] ?? "development";

dotenv.config({ path: path.join(root, ".env") });
dotenv.config({ path: path.join(root, `.env.${nodeEnv}`) });
dotenv.config({ path: path.join(root, ".env.local") });
dotenv.config({ path: path.join(root, `.env.${nodeEnv}.local`) });

export function env(key: string): string;
export function env<T extends string>(key: string, fallback: T): string;
export function env<T extends number>(key: string, fallback: T): number;
export function env<T extends boolean>(key: string, fallback: T): boolean;

export function env<T extends string | number | boolean>(key: string, fallback?: T): string | number | boolean {
  const raw = process.env[key];

  if (raw === undefined) {
    if (fallback === undefined) {
      return easeConfig.throw(`Missing required environment variable: "${key}"\nAdd it to your .env file or provide a fallback: env("${key}", defaultValue)`);
    }
    return fallback;
  }

  if (fallback !== undefined) {
    if (typeof fallback === "number") {
      const parsed = Number(raw);
      if (isNaN(parsed)) {
        return easeConfig.throw(`env("${key}") expected a number, got: "${raw}"`);
      }
      return parsed;
    }
    if (typeof fallback === "boolean") {
      return raw === "true" || raw === "1";
    }
  }

  return raw;
}
