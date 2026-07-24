#!/usr/bin/env node
/**
 * Static server: serves the mirrors + a JSON endpoint for the comparison
 * script. Also screenshots the source + both mirrors at three viewports.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 4317;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
};

const routes = {
  '/': 'mirrors/pencil/index.html',
  '/pencil': 'mirrors/pencil/index.html',
  '/forge': 'mirrors/forge/dist/index.html',
  '/source.json': '_capture/source.json',
};

const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  const rel = routes[u.pathname];
  if (!rel) { res.writeHead(404); res.end('not found'); return; }
  const full = path.join(ROOT, rel);
  const ext = path.extname(full);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain' });
  fs.createReadStream(full).pipe(res);
});

server.listen(PORT, () => console.log(`[serve] http://localhost:${PORT}  (routes: ${Object.keys(routes).join(', ')})`));
