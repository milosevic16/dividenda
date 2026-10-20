import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.ttf':'font/ttf','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if (!(await stat(file)).isFile()) throw new Error('Not a file');
    response.writeHead(200, {'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store'});
    response.end(await readFile(file));
  } catch { response.writeHead(404, {'Content-Type':'text/html; charset=utf-8'}); response.end(await readFile(path.join(root,'404.html'))); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
