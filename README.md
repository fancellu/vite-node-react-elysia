# Vite + Node + React + Elysia (Elysia v2 / Eden Treaty 2)

This project demonstrates a modern full-stack architecture using **Elysia** on **Node.js** with a **React** frontend powered by **Vite**. It achieves end-to-end type safety using **Eden Treaty 2** without requiring the Bun runtime.

## Core Features

- **🚀 Elysia v1.2+ on Node.js**: High-performance backend using the `@elysiajs/node` adapter.
- **🛡️ Eden Treaty 2**: Full end-to-end type safety with the modern Treaty 2 syntax. The frontend "knows" the backend API types automatically.
- **⚡ Vite Frontend**: Fast HMR and optimized builds for React.
- **💎 TypeScript "Project References"**: Clean separation between Frontend, Backend, and Tooling (Vite) configurations.
- **🔧 Zero Bun Dependency**: Optimized for environments where Node.js is the preferred runtime.

## API Endpoints (Prefixed with `/api`)

- **GET `/hello`**: Returns a simple greeting object.
- **GET `/ping`**: Returns persistent backend status, including OS platform and uptime.
- **DELETE `/delete/:id`**: Demonstrates **Path Parameters** using `t.Numeric()` for automatic type coercion.
- **POST `/deletePost`**: Demonstrates **Request Body** validation for a delete-like operation.

## Project Structure

```text
├── backend/src/server.ts  # Elysia server & API definitions
├── frontend/src/          # React application
│   ├── eden.ts            # Eden Treaty 2 client configuration
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

## Production Build

1. **Build the Frontend**:
   ```bash
   npm run build
   ```
   This compiles TypeScript and builds the React app to `frontend/dist`.

2. **Start the Production Server**:
   ```bash
   npm start
   ```
   The backend serves the built frontend and API on port 3000.

3. **Access the Production App**:
   - Application: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:3000/api/hello](http://localhost:3000/api/hello)

**Note**: Due to issues with `@elysiajs/static` plugin (MIME type handling), this project uses a custom static file server in production that properly sets content types for `.js`, `.css`, `.png`, `.svg`, and other assets.

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

## Type Safety with Eden Treaty 2

The project exports the backend's type definition:
```typescript
// backend/src/server.ts
export type App = typeof app;
```

And consumes it in the frontend using the new **Treaty 2** syntax:
```typescript
// frontend/src/eden.ts
import { treaty } from '@elysiajs/eden'
import type { App } from "@backend/server";

export const client = treaty<App>(window.location.origin)

// Usage in App.tsx (Path Parameters)
const { data } = await client.api.delete({ id: 1 }).delete()
```

No more manual interface syncing or `fetch` guessing!

## TypeScript Configuration

The project uses TypeScript project references for clean separation:
- `tsconfig.json`: Root configuration with project references
- `tsconfig.app.json`: Frontend configuration (includes both frontend and backend for type imports)
- `tsconfig.node.json`: Backend and tooling configuration

Both frontend and backend configs use `composite: true` to enable proper type checking during builds.
