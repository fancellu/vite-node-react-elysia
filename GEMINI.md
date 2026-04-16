# Project Overview
`vite-node-react-elysia` is a full-stack web application designed to demonstrate the integration of **Elysia** (a high-performance web framework) with **React** using **Vite**, all running on **Node.js** (as opposed to Bun).

The project is structured with a clear separation between the frontend and backend:
- **Backend**: Built with Elysia using the `@elysiajs/node` adapter. It serves API requests and is located in `backend/src/server.ts`.
- **Frontend**: A React application managed by Vite, located in `frontend/src/`.

The backend runs on port 3000, and the Vite development server runs on port 5173, proxying requests starting with `/api` to the backend.

## Building and Running
The project uses `npm` as its package manager and defines several scripts for development and building:

- **Run both (Frontend & Backend):**
  ```bash
  npm run dev
  ```
- **Run Frontend only:**
  ```bash
  npm run dev:frontend
  ```
- **Run Backend only:**
  ```bash
  npm run dev:backend
  ```
- **Build the project:**
  ```bash
  npm run build
  ```
- **Lint the project:**
  ```bash
  npm run lint
  ```

## Development Conventions
- **API Prefixing:** The backend is configured with a `/api` prefix for all routes. The Vite dev server is configured to proxy `/api` requests to `http://localhost:3000/api`.
- **Backend Development:** The backend uses `tsx watch` for hot-reloading during development.
- **Frontend Structure:** The React root is located at `frontend/src`, and the build output is directed to `dist`.
- **Environment Detection:** The backend includes logic to detect `NODE_ENV` and operating system details, useful for environment-specific configurations.
