# Vite + Node + React + Elysia (no Bun)

This project demonstrates a modern full-stack architecture using **Elysia** on **Node.js** with a **React** frontend powered by **Vite**. It achieves end-to-end type safety without requiring the Bun runtime.

## Core Features

- **🚀 Elysia on Node.js**: High-performance backend using the `@elysiajs/node` adapter.
- **🛡️ Eden Treaty**: Full end-to-end type safety. The frontend "knows" the backend API types automatically.
- **⚡ Vite Frontend**: Fast HMR and optimized builds for React.
- **💎 TypeScript "Project References"**: Clean separation between Frontend, Backend, and Tooling (Vite) configurations.
- **🔧 Zero Bun Dependency**: Optimized for environments where Node.js is the preferred runtime.

## Project Structure

```text
├── backend/src/server.ts  # Elysia server & API definitions
├── frontend/src/          # React application
│   ├── eden.ts            # Eden Treaty client configuration
│   └── App.tsx            # Type-safe API usage example
├── public/                # Static assets
└── vite.config.ts         # Vite configuration with API proxy
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Mode**:
   Starts both the backend (port 3000) and the frontend (port 5173) concurrently.
   ```bash
   npm run dev
   ```

3. **Access the App**:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5173/api/hello](http://localhost:5173/api/hello) (proxied)

## Asset Management

This project uses two different ways to handle static files, following Vite best practices:

### 1. `frontend/src/assets/` (The "Imported" way)
Use this for images and files used directly inside your React components.
- **How it works**: Vite processes these files, adds a content hash to the filename for cache busting (e.g., `hero-Cj38S9a.png`), and can even inline small files.
- **Usage**:
  ```tsx
  import heroImg from './assets/hero.png'
  <img src={heroImg} />
  ```

### 2. `public/` (The "Static" way)
Use this for files that should never change their URL and are referenced as absolute paths.
- **How it works**: Vite ignores these files during processing and simply copies them to the build root.
- **Usage**:
  ```tsx
  // Referenced as a simple string, no import needed
  <link rel="icon" href="/favicon.svg" />
  <use href="/icons.svg#github-icon" />
  ```

## Type Safety with Eden Treaty

The project exports the backend's type definition:
```typescript
// backend/src/server.ts
export type App = typeof app;
```

And consumes it in the frontend for a completely type-safe developer experience:
```typescript
// frontend/src/eden.ts
import { edenTreaty } from '@elysiajs/eden'
import type { App } from "@backend/server";

export const client = edenTreaty<App>(window.location.origin)
```

No more manual interface syncing or `fetch` guessing!
