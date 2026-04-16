import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
// import staticPlugin from "@elysiajs/static";

import os from 'os';

const osType = os.type();        // Returns "Windows_NT", "Darwin", or "Linux"
const osPlatform = os.platform(); // Returns "win32", "darwin", or "linux"

const isProd = process.env.NODE_ENV === 'production'

console.log('\n' + '='.repeat(40))
console.log(`🚀 RUNNING IN ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} MODE`)
console.log('='.repeat(40) + '\n')


console.log(`Operating System: ${osType}`);

new Elysia({ adapter: node(), prefix: '/api' })
    .onBeforeHandle(({ params, query, path, body }) => {
        console.log(`\n[${new Date().toLocaleTimeString()}] ${path}`);
        if (Object.keys(params || {}).length > 0) console.log('  Params:', params);
        if (Object.keys(query || {}).length > 0) console.log('  Query:', query);
        if (body) {
            // Log body keys but avoid logging large file buffers
            const bodyKeys = Object.keys(body as object);
            console.log('  Body:', bodyKeys.join(', '));
        }
    })
    // .use(await staticPlugin({ alwaysStatic: true, assets: "public", prefix: '/', bunFullstack : true }))
    .get("/hello", () => ({ hello: "Node.js!👋" }))
    .get('/ping', () => {
        return { status: 'success',  data: `Data from persistent Bun daemon! isProd=${isProd} ` + new Date().toLocaleString()+` ${osPlatform}`}
    })
  .listen(3000);

console.log(`Listening on http://localhost:3000`);
