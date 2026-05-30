# @ease-lab/config

A lightweight configuration system for Node.js applications inspired by Laravel.

Part of the **Ease Lab** ecosystem.

---

## ✨ Features

- File-based configuration system
- Type-safe config generation
- Laravel-inspired developer experience
- Automatic config discovery
- Simple CLI for config types generation

---

## 📦 Installation

```bash
npm install @ease-lab/config
npm install -D @ease-lab/config-cli
```

## 📁 Configuration Structure
All configuration files must be placed inside the ``config/`` directory. \
Each file must be a `TypeScript (.ts)` or `JavaScript (.js)` module exporting a default `defineConfig` function.

#### Example
```ts
// config/app.ts
import { defineConfig, env } from "@ease-lab/config";

export default defineConfig({
  name: "My App",
  port: env('APP_PORT', 3000),
});
```

## ⚙️ Usage
Configuration is accessed via a simple typed object:
```ts
import { config } from '@ease-lab/config';

console.log(config.app.port);
// `app` refers to config/app.ts
```

## 🔄 Workflow
After creating or updating config files, run: `npx ease-config generate` to regenerate all types.

## 🧠 Philosophy
Ease Lab Config brings a Laravel-like configuration experience into Node.js:
- Simple file-based structure
- Developer-friendly API
- Fully type-safe configuration access
- Minimal runtime overhead

## 📄 License
MIT