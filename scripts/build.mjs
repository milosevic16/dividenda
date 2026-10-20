import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import assert from 'node:assert/strict';
import { render, escape } from '../src/template.mjs';
import { content } from '../src/content.ts';

const require = createRequire(import.meta.url);
let sharp;
try { sharp = require('sharp'); }
catch { sharp = require('C:/Users/priva/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp'); }
const origin = process.env.SITE_ORIGIN || 'https://dividenda-ptuj-redesign.milo-evi-i-f-3841.chatgpt.site';
const output = path.resolve('dist');
await fs.mkdir(path.join(output, 'assets/fonts'), { recursive: true });
await fs.cp('src/assets/fonts', path.join(output, 'assets/fonts'), { recursive: true, filter: source => !source.endsWith('.ttf') });
await fs.copyFile('src/assets/fonts.css', path.join(output, 'assets/fonts.css'));
await fs.copyFile('src/styles.css', path.join(output, 'assets/styles.css'));
await fs.copyFile('src/app.js', path.join(output, 'assets/app.js'));
const source = 'src/assets/ptuj-original.jpg';
for (const width of [640, 1000, 1600]) {
  const image = sharp(source).resize(width, Math.round(width * .875), { fit:'cover', position:'centre' });
  await Promise.all([
    image.clone().avif({quality:55}).toFile(path.join(output, `assets/ptuj-${width}.avif`)),
    image.clone().webp({quality:83}).toFile(path.join(output, `assets/ptuj-${width}.webp`)),
    image.clone().jpeg({quality:85,mozjpeg:true}).toFile(path.join(output, `assets/ptuj-${width}.jpg`))
  ]);
}
await sharp(source).resize(1200,630,{fit:'cover',position:'centre'}).jpeg({quality:85}).toFile(path.join(output,'assets/social.jpg'));
await fs.writeFile(path.join(output,'assets/favicon.svg'),'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#e7df77"/><path d="M19 12h13c15 0 22 9 22 20S47 52 32 52H19V12Zm5 5v30h8c11 0 17-6 17-15s-6-15-17-15h-8Z" fill="#292e28"/></svg>');
let html = render(origin).replaceAll('.ttf', '.woff2').replaceAll('type="font/ttf"','type="font/woff2"');
await fs.writeFile(path.join(output, 'index.html'), html);
const notFound = `<!doctype html><html lang="sl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escape(content.notFound.title)}</title><link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/assets/styles.css"></head><body><main class="wrap section"><p class="eyebrow">DIVIDENDA · 404</p><h1>${escape(content.notFound.heading)}</h1><p style="margin-block:32px">${escape(content.notFound.description)}</p><a class="button" href="/">${escape(content.notFound.link)}</a></main></body></html>`;
await fs.writeFile(path.join(output,'404.html'),notFound);

// Guards run on emitted HTML. A failing guard blocks publication.
html = await fs.readFile(path.join(output,'index.html'),'utf8');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Exactly one static h1');
assert.match(html,/<html lang="sl">/);
assert.ok(html.includes(`<link rel="canonical" href="${origin}/">`));
for (const attr of ['og:title','og:description','og:url','og:image','og:locale']) assert.ok(html.includes(`property="${attr}"`),attr);
for (const lang of ['sl','x-default']) assert.ok(html.includes(`hreflang="${lang}" href="${origin}/"`));
assert.ok(!/gozd|10\.000/i.test(html),'Forest advertisement omitted');
assert.equal(html.split('17 LET IZKUŠENJ').length - 1, 1, 'User-requested experience motto appears once');
assert.ok(html.includes('051 848 241') && html.includes('info@dividenda.com'));
assert.equal((html.match(/<details open/g)||[]).length,4,'Services expanded without JavaScript');
const strings = value => typeof value === 'string' ? [value] : value && typeof value === 'object' ? Object.values(value).flatMap(strings) : [];
for (const [key, value] of Object.entries(content).filter(([key])=>key !== 'notFound')) {
 for (const str of strings(value).filter(s=>s.length>35 && !/^https?:/.test(s))) assert.ok(html.includes(escape(str)),`Missing copy in ${key}: ${str}`);
}
for (const str of Object.values(content.notFound)) assert.ok(notFound.includes(escape(str)), `Missing 404 copy: ${str}`);
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) {
  const name = match[1];
  if(name==='/') continue;
  await fs.access(path.join(output,name));
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(new Set(ids).size,ids.length,'Unique ids');
for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]),`Anchor exists: ${match[1]}`);
const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"><url><loc>${canonical}</loc><xhtml:link rel="alternate" hreflang="sl" href="${canonical}"/><xhtml:link rel="alternate" hreflang="x-default" href="${canonical}"/></url></urlset>`);
await fs.writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await fs.writeFile(path.join(output,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: frame-ancestors \'none\'\n  Strict-Transport-Security: max-age=31536000; includeSubDomains\n  Cache-Control: no-cache\n');
const colors = {ink:'#292e28',paper:'#f5f3eb',muted:'#626658',yellow:'#e7df77',panel:'#eae8dd',darkMuted:'#c5c9bb',portalActive:'#343b30'};
const luminance = hex => {
 const c=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return c[0]*.2126+c[1]*.7152+c[2]*.0722;
};
for(const [front,back] of [['ink','paper'],['muted','paper'],['muted','panel'],['ink','yellow'],['paper','ink'],['yellow','ink'],['darkMuted','ink'],['paper','portalActive'],['darkMuted','portalActive'],['yellow','portalActive']]) {
 const a=luminance(colors[front]),b=luminance(colors[back]);
 const ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
 assert.ok(ratio>=4.5,`AA text contrast ${front}/${back}`);
 console.log(`${front}/${back}: ${ratio.toFixed(2)}:1`);
}
console.log('Built complete static HTML, responsive image formats, metadata, sitemap, robots and 404. All guards passed.');
