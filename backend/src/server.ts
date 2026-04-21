import { Elysia, t } from "elysia";
import { node } from "@elysiajs/node";
import { readFileSync } from 'fs';
import { join } from 'path';
import { swagger } from '@elysiajs/swagger'

import os from 'os';

const osType = os.type();        // Returns "Windows_NT", "Darwin", or "Linux"
const osPlatform = os.platform(); // Returns "win32", "darwin", or "linux"

const isProd = process.env.NODE_ENV === 'production'

console.log('\n' + '='.repeat(40))
console.log(`🚀 RUNNING IN ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} MODE`)
console.log('='.repeat(40) + '\n')


const api=
    new Elysia({ adapter: node(), prefix: '/api' })
        .use(swagger())
        .onBeforeHandle(({ params, query, path, body }) => {
            console.log(`\nAPI [${new Date().toLocaleTimeString()}] ${path}`);
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
            return `Data from persistent Elysia backend! isProd=${isProd} ` + new Date().toLocaleString()+` ${osPlatform}`
        }) // takes params in path
        .delete('/remove/:id', async ({params: { id }, status}) => {
            return  status(200, `Deleted, got param with ID ${id}`)
        }, {
            params: t.Object({
                id: t.Numeric(),
            })
        }) // takes params in body
        .post('/deletePost', async ({body, status}) => {
            return  status(200, `Deleted, got query with ID ${body.id}`)
        }, {
            body: t.Object({
                id: t.Number(),
            })
        })

console.log(`Operating System: ${osType}`);

const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
}

export const app=
    new Elysia({ adapter: node() })
    .onBeforeHandle(({ params, query, path, body }) => {
        console.log(`\n[${new Date().toLocaleTimeString()}] ${path}`);
        if (Object.keys(params || {}).length > 0) console.log('  Params:', params);
        if (Object.keys(query || {}).length > 0) console.log('  Query:', query);
        if (body) {
            // Log body keys but avoid logging large file buffers
            const bodyKeys = Object.keys(body as object);
            console.log('  Body:', bodyKeys.join(', '));
        }
    }) // we cannot use staticPlugin, it is broken https://github.com/elysiajs/elysia-static/issues/62
    .get('/*', ({ path, set }) => {
        if (!isProd || path.startsWith('/api')) return
        try {
            const filePath = path === '/' ? '/index.html' : path
            const ext = filePath.substring(filePath.lastIndexOf('.'))
            const fullPath = join('frontend/dist', filePath)
            const content = readFileSync(fullPath)
            set.headers['content-type'] = mimeTypes[ext] || 'application/octet-stream'
            return content
        } catch {
            const content = readFileSync('frontend/dist/index.html')
            set.headers['content-type'] = 'text/html'
            return content
        }
    })
    .use(api)

app.listen(3000);

console.log(`Listening on http://localhost:3000`);

export type App = typeof app