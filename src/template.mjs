import { company as co, content as c, photo } from './content.ts';

export const escape = (v) => String(v).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const e = escape;
const arrow = (diagonal = false) => `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="arrow${diagonal ? ' diagonal' : ''}"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const pin = `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" stroke-width="1.3"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.3"/></svg>`;
const icons = {
  house: '<path d="m3 11 9-8 9 8M5.5 9.5V21h13V9.5M10 21v-7h4v7"/>',
  key: '<circle cx="8" cy="8" r="4.5"/><path d="m11.3 11.3 9 9m-3-3 2.5-2.5m-5.5-.5 2.5-2.5"/>',
  document: '<path d="M6 3h9l4 4v14H6V3Zm8 0v5h5M9 12h7m-7 4h5"/>',
  value: '<path d="M4 20V4m0 16h17M8 16l4-5 4 2 5-7m-5 0h5v5"/>'
};
const icon = name => `<svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
const emblem = `<svg viewBox="0 0 160 160" fill="none" aria-hidden="true"><path d="M33 132V29h44c37 0 54 23 54 51s-17 52-54 52H33Z" stroke="currentColor" stroke-width="1"/><path d="M49 132V45h28c27 0 38 17 38 35s-11 36-38 36H33M17 132h130M49 12v136" stroke="currentColor" stroke-width="1"/><path d="M77 29v103M33 80h98" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 4"/></svg>`;

export function render(origin) {
 const schema = { '@context':'https://schema.org', '@type':'RealEstateAgent', '@id':`${origin}/#organization`, name:co.legalName, url:`${origin}/`, telephone:'+38651848241', email:co.email, address:{'@type':'PostalAddress', streetAddress:co.address, postalCode:'2250', addressLocality:'Ptuj', addressCountry:'SI'} };
 return `<!doctype html>
<html lang="sl"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(c.meta.title)}</title><meta name="description" content="${e(c.meta.description)}">
<link rel="canonical" href="${origin}/"><link rel="alternate" hreflang="sl" href="${origin}/"><link rel="alternate" hreflang="x-default" href="${origin}/">
<meta property="og:type" content="website"><meta property="og:locale" content="sl_SI"><meta property="og:site_name" content="Dividenda">
<meta property="og:title" content="${e(c.meta.title)}"><meta property="og:description" content="${e(c.meta.description)}"><meta property="og:url" content="${origin}/"><meta property="og:image" content="${origin}/assets/social.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#f5f3eb">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preload" href="/assets/fonts/instrument-serif.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="/assets/fonts/dm-sans-regular.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" as="image" imagesrcset="/assets/ptuj-640.webp 640w, /assets/ptuj-1000.webp 1000w, /assets/ptuj-1600.webp 1600w" imagesizes="(max-width: 760px) 100vw, 56vw">
<link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/assets/styles.css"><script src="/assets/app.js" defer></script>
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
</head><body id="top">
<a class="skip-link" href="#main">${e(c.skip)}</a>
<header class="header wrap">
  <a class="brand" href="/" aria-label="Dividenda — domov">Dividenda<span aria-hidden="true">.</span><small>${e(c.header.tagline)}</small></a>
  <nav class="desktop-nav" aria-label="Glavna navigacija">${c.navigation.map(n=>`<a href="${n.href}">${e(n.label)}</a>`).join('')}</nav>
  <a class="header-contact" href="#kontakt">${e(c.header.contact)}${arrow(true)}</a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="mobile-nav" data-menu data-open-label="${e(c.header.menu)}" data-close-label="${e(c.header.close)}"><span data-menu-label>${e(c.header.menu)}</span><span class="menu-lines" aria-hidden="true"></span></button>
  <nav id="mobile-nav" class="mobile-nav" aria-label="Mobilna navigacija">${c.navigation.map(n=>`<a href="${n.href}">${e(n.label)}${arrow()}</a>`).join('')}<a href="#kontakt">${e(c.header.contact)}${arrow()}</a></nav>
</header>
<main id="main">
  <section class="hero wrap" aria-labelledby="hero-heading">
    <div class="hero-copy"><p class="eyebrow"><span class="tiny-square" aria-hidden="true"></span>${e(c.hero.eyebrow)}</p>
      <h1 id="hero-heading">${c.hero.lines.map(l=>`<span>${e(l)}</span>`).join('')}<em>${e(c.hero.lastLine)}</em></h1>
      <p class="hero-description">${e(c.hero.description)}</p>
      <a class="button" href="#kontakt">${e(c.hero.primary)}${arrow(true)}</a>
      <a class="text-link hero-secondary" href="#storitve">${e(c.hero.secondary)}${arrow()}</a>
    </div>
    <figure class="hero-image">
      <picture><source type="image/avif" srcset="/assets/ptuj-640.avif 640w, /assets/ptuj-1000.avif 1000w, /assets/ptuj-1600.avif 1600w" sizes="(max-width: 760px) 100vw, 56vw"><source type="image/webp" srcset="/assets/ptuj-640.webp 640w, /assets/ptuj-1000.webp 1000w, /assets/ptuj-1600.webp 1600w" sizes="(max-width: 760px) 100vw, 56vw"><img src="/assets/ptuj-1600.jpg" srcset="/assets/ptuj-640.jpg 640w, /assets/ptuj-1000.jpg 1000w, /assets/ptuj-1600.jpg 1600w" sizes="(max-width: 760px) 100vw, 56vw" alt="${e(c.hero.imageAlt)}" width="1600" height="1400" fetchpriority="high"></picture>
      <span class="image-place">${pin}${e(c.hero.imageLocation)}</span>
      <figcaption><span class="caption-mark" aria-hidden="true">${emblem}</span><div><strong>${e(c.hero.caption)}</strong><span>${e(c.hero.captionSmall)}</span></div></figcaption>
    </figure>
  </section>
  <div class="hero-base wrap"><p>${e(c.hero.footnote)}</p><a href="#storitve">${e(c.hero.scroll)}<svg viewBox="0 0 24 24" class="arrow" fill="none" aria-hidden="true"><path d="M12 4v15m-6-6 6 6 6-6" stroke="currentColor" stroke-width="1.3"/></svg></a></div>
  <section class="services wrap section" id="storitve" aria-labelledby="services-heading">
    <div class="section-intro"><p class="eyebrow">${e(c.services.eyebrow)}</p><h2 id="services-heading">${e(c.services.heading)}<em>${e(c.services.italic)}</em></h2><p>${e(c.services.intro)}</p><a class="text-link" href="#kontakt">${e(c.services.link)}${arrow(true)}</a></div>
    <div class="service-list">${c.services.items.map((s)=>`<details open class="service"><summary>${icon(s.icon)}<h3>${e(s.title)}</h3><span class="detail-toggle" aria-hidden="true"></span></summary><div class="service-body"><p>${e(s.description)}</p></div></details>`).join('')}</div>
  </section>
  <section class="listings" id="ponudba" aria-labelledby="listings-heading"><div class="wrap listings-inner">
    <div class="listings-heading"><p class="eyebrow" id="listings-heading"><span class="tiny-square" aria-hidden="true"></span>${e(c.listings.eyebrow)}</p></div><p class="listings-intro">${e(c.listings.intro)}</p>
    <div class="portal-list">${c.listings.portals.map(p=>`<a class="portal" href="${e(p.href)}" target="_blank" rel="noopener noreferrer"><span class="portal-label">${e(p.label)}</span><strong>${e(p.name)}</strong><span class="portal-description">${e(p.description)}</span><span class="portal-arrow">${arrow(true)}</span><span class="sr-only"> (odpre se v novem zavihku)</span></a>`).join('')}</div>
    <p class="listings-direct">${e(c.listings.direct)} <a href="#kontakt">${e(c.listings.directLink)}${arrow()}</a></p>
  </div></section>
  <section class="about wrap section" id="o-nas" aria-labelledby="about-heading">
    <div class="about-portrait"><div class="brand-emblem">${emblem}</div><blockquote>»${e(c.about.quote)}«</blockquote><div class="agent"><span class="agent-initials" aria-hidden="true">IJ</span><div><strong>${e(co.agent)}</strong><span>${e(c.about.agentRole)}</span></div></div><dl class="credentials"><div><dt>${e(c.about.licenseLabel)}</dt><dd>${e(co.license)}</dd></div><div><dt>${e(c.about.registryLabel)}</dt><dd>${e(co.registry)}</dd></div></dl></div>
    <div class="about-copy"><p class="eyebrow">${e(c.about.eyebrow)}</p><h2 id="about-heading">${e(c.about.heading)}<em>${e(c.about.italic)}</em></h2><p class="large-copy">${e(c.about.intro)}</p><p>${e(c.about.text)}</p><a class="text-link" href="#kontakt">${e(c.about.contact)}${arrow(true)}</a></div>
  </section>
  <section class="contact" id="kontakt" aria-labelledby="contact-heading"><div class="wrap contact-inner">
    <div class="contact-title"><p class="eyebrow">${e(c.contact.eyebrow)}</p><h2 id="contact-heading">${e(c.contact.heading)}<em>${e(c.contact.italic)}</em></h2><p>${e(c.contact.intro)}</p></div>
    <div class="contact-details"><a class="contact-phone" href="${co.phoneHref}"><span>${e(c.contact.phone)}</span><strong>${e(co.phone)}</strong>${arrow(true)}</a><a class="contact-email" href="mailto:${co.email}"><span>${e(c.contact.email)}</span><strong>${e(co.email)}</strong>${arrow(true)}</a><div class="contact-address"><div><span>${e(c.contact.visit)}</span><address>${e(co.address)}, ${e(co.city)}</address><p>${e(c.contact.availability)}</p></div><a href="${e(co.mapHref)}" target="_blank" rel="noopener noreferrer">${e(c.contact.map)}${arrow(true)}<span class="sr-only"> (odpre se v novem zavihku)</span></a></div></div>
  </div></section>
</main>
<footer class="footer wrap"><div class="footer-main"><a href="/" class="brand">Dividenda<span aria-hidden="true">.</span></a><p>${e(c.footer.tagline)}</p><a href="#top" class="back-top">${e(c.footer.back)}${arrow(true)}</a></div><div class="footer-bottom"><p>© ${new Date().getFullYear()} ${e(co.legalName)} · ${e(c.footer.rights)}</p><div><a href="#zasebnost" data-dialog="privacy-dialog">${e(c.footer.privacy)}</a><a href="#fotografija" data-dialog="credits-dialog">${e(c.footer.credits)}</a></div><span>${e(c.header.location)}</span></div>
<div class="legal-fallback" id="zasebnost"><h2>${e(c.footer.privacyTitle)}</h2><p>${e(c.footer.privacyText)}</p><p>${e(c.footer.privacyContact)} <a href="mailto:${co.email}">${co.email}</a>.</p></div>
<div class="legal-fallback" id="fotografija"><h2>${e(c.footer.creditsTitle)}</h2><p>${e(c.footer.creditsText)}</p><p><a href="${e(photo.source)}" target="_blank" rel="noopener noreferrer">${e(c.footer.creditsSource)}</a> · <a href="${photo.license}" target="_blank" rel="noopener noreferrer">${e(c.footer.license)}</a></p></div>
</footer><template id="dialog-close-template"><button class="dialog-close">${e(c.footer.close)}</button></template>
</body></html>`;
}
