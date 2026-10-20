# Dividenda

A static, responsive redesign of Dividenda's real-estate agency site.

Requires Node 24+.

```sh
npm install
npm run build
npm run preview
```

All visitor-facing copy lives in `src/content.ts`. All content is emitted in HTML and remains available without JavaScript. The built site is in `dist/`.

Set `SITE_ORIGIN` before building if moving the site to another domain, so canonical, Open Graph and sitemap URLs are regenerated together.

See `AGENTS.md` for content sources, deliberate omissions and verification requirements.
