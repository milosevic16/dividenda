# Dividenda redesign — project map

This is a static, Slovenian-language renovation of http://www.dividenda.com/.
The existing domain is not modified. The Sites version is a private review site.

- Source of truth: `src/`. `content.ts` owns page copy and company facts; `template.mjs` emits the complete HTML.
- `npm run build` generates `dist/`, image variants, sitemap and robots; its guards must pass.
- `npm run preview` serves the built output on http://127.0.0.1:4173.
- JavaScript only enhances mobile navigation and native legal dialogs; all four service disclosures ship open.
- No analytics, captcha, contact form or non-essential cookies. Contact uses phone, email and external maps.
- The forest-sale ad is deliberately omitted. The owner explicitly requested “17 let izkušenj” in the hero on 2026-10-20; it appears above the main headline.
- Business details and the agent license were transcribed from the original site on 2026-10-20; the license has not been independently revalidated.
- The original Nepremicnine.net URL pointed at an account page. This version links to the public portal and labels it accordingly.
- Photography: Jernej Furman, CC BY 2.0. Attribution is rendered in the footer photography disclosure.
- Fonts: DM Sans and Instrument Serif, SIL Open Font License. WOFF2 subsets and measured Arial/Georgia fallbacks are committed assets.
- `scripts/prepare-fonts.py` is asset preparation, not part of hosting. It needs fonttools/brotli and the original TTF files.
- Done means: build guards pass, desktop and 375px visual review, no narrow overflow, keyboard/menu/dialog checks, no new console errors, honest reporting of skipped checks.
- Accessibility target: WCAG 2.2 AA. The EU EAA is in force; no claim is made about the business's legal scope.

Website rules are in `.agents/skills/`. Do not push or replace dividenda.com without an explicit request.
