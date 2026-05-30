# ease-config
A Node.js package that provides a Laravel-inspired configuration system.

## Example
All configuration files are loaded from the config/ directory. Each file must be a .ts or .js module that default-exports a defineConfig call.

config/app.ts
```ts
import { defineConfig } from '@ease/config';

export default defineConfig({
  port: 3000,
  debug: env('APP_DEBUG', false),
});
```
