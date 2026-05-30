# ease-config
A Node.js package that provides a Laravel-inspired configuration system.

## Installation
You must install a core
```bash
npm install @ease/config
```

and CLI for generating configs
```bash
npm install -D @ease/config-cli
```


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
After creating or updating configuration files, run ``npx ease-config generate`` to regenerate all types and values.

Usage in index.ts file
```ts
import { config } from '@ease/config';

console.log(config.app.port); // `app` refers to the config file name (`config/app.ts`)
```
