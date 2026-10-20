---
name: web-design
description: "Design rules for marketing websites that must not look AI-generated: AI-look no-gos (colour, type, layout, icons, shape, copy, motion), palette and contrast mechanics, typography scale, signature elements, card and hover treatment, motion rules, copy voice. Use when styling, choosing colours, fonts or layout, adding animation, designing a component, or writing visible copy for a website."
---

<!-- GENERATED from ~/.claude/rules/design.md by ~/.agents/sync-from-claude.mjs — edit the source, then re-run the sync. -->

# Design rules — websites

Extracted from a prerendered marketing-site build (editorial/technical register, bilingual, law-firm client) and confirmed/extended by a second build (bilingual personal-brand site for a lawyer-investor: same editorial register, dark chrome over paper, a canvas network-map centerpiece, phone-heavy audience). The register was "instrumentation": monospace labels, hairlines, flat fills, restrained one-shot motion. Adapt the register per project; the rules below survive the register.

## Never — AI-look no-gos

The tells that make a stranger guess "an AI made this." Avoid on sight; the "instead" is the rule.

**Color**
- Never the indigo→purple→pink gradient, gradient text, neon glows, or five hues fighting. Instead: a near-neutral base ramp + 1–2 accents, flat confident fills, hairline borders.
- Never bolt a new accent hue onto an approved palette. Three separate accent attempts (beige, khaki, brighter greens) were all rejected on sight; what stuck was a *desaturated relative* of the existing ink ("ink with a cast", a muted navy) with named jobs. New colors enter as quiet family members with jobs, or not at all.
- Never "sprinkle" an accent across a page to add interest — it reads as noise and was explicitly called out as bad. Accents live on structural elements: CTAs, pricing borders, process rails, section rules.
- Never drop a near-black "terminal" panel into a light page — it reads as a different site pasted in. Panels stay in the page's own tonal family, one step darker than the base surface. (Full-bleed dark BANDS are a different thing: when the chrome itself is dark — masthead, footer — alternating dark/paper sections read as one system, not a paste-in.)

**Type**
- Never Inter/system-ui at default weights with one giant bold centered headline. Instead: commit to a face with a point of view (or display+text pairing), self-hosted, with a real scale and specific weights.

**Layout**
- Never everything-centered; never the hero → 3 feature cards → testimonials → CTA skeleton; never three perfectly symmetric cards; never one `max-w-2xl` centered column for the whole page. Instead: a grid you use and break on purpose, density variation, left-aligned editorial blocks.

**Icons & decoration**
- Never emoji as icons or bullets (✨🚀💡) — the loudest tell. Never mesh-gradient blobs or isometric "AI illustration" filler. Instead: one icon set at one stroke weight, or none; decoration earned from the content.
- Never a raw arrow/dingbat codepoint (↗ ✓ ▶) as a UI glyph — several carry emoji presentation on iOS and render as a color emoji in the middle of your type. Inline SVG at `currentColor` (or append U+FE0E if you must stay text).

**Shape & effects**
- Never rounded-everything, glassmorphism/backdrop-blur cards, or a soft shadow on every box. Instead: a tight radius scale (this lineage: effectively square; radius only on genuinely circular elements), hairlines and flat fills, one shadow style used sparingly — mostly on hover lifts, at most one resting panel per page.

**Copy**
- Never the "✨ Introducing" pill; never Elevate/Seamless/Unlock/Supercharge/"the future of X". Instead: concrete copy in a real voice that says what the thing is and does.

**Structure & labels**
- No section numbering — except when it really makes sense (a true sequential process, legal § marks on a law site), and even then kept quiet. Decorative "01/02/03" eyebrows on unordered content are auto-generated-outline scaffolding.

**Motion** (each of these was proposed and killed in review)
- Never radar pings, HUD/sci-fi flourishes, or anything from the game-UI register on a professional site. One narrow exception, strictly read: an element that IS a live instrument — an actual map/graph the visitor operates — may carry a single small, slow, visibility-gated ping that states a real fact ("this hub is live"). Necessity, not garnish: at most one on the page, and if the ping would survive on any other element, it's decoration — cut it. (Resolved across two projects: banned as decoration everywhere; earned exactly once, on a network map's own hub.)
- Never skeleton-shimmer loops on real content — it's the universal loading-state cliché.
- Never a gloss sweep looping on the CTA button (the marketing-template tell, and it competes with the one conversion element).
- Never countdown/urgency timers as decoration — on a regulated/legal/claims page a fake-precise timer is not just cheap, it's misleading.
- Never mock UI with fabricated data (fake register entries, fake dashboard rows) as hero decoration.
- Never a staged hero entrance that hides the h1 behind a JS un-hide — the page's highest-weight text must never depend on JavaScript to appear (also an SEO rule).
- Never "everything fades in on scroll." Cap the reveal set; headings and section heads are the ceiling, the h1 is out of bounds.

**Litmus test:** remove the logo — is it still recognizably this brand, or a template? Would a designer who cares sign it?

## Palette mechanics

- All tokens as CSS custom properties; map the utility framework's theme to `var()`s so utilities and bespoke CSS share one source. (confirmed in 2nd project: `:root` defaults + per-view re-assertion)
- Every color has a job: surface, surface-2 (one step darker), panel, panel-inset, hairline, hairline-strong, ink, ink-2, accent, accent-soft wash, scan tint. No color without a role.
- A panel that sits ~1.2:1 against the page needs a real border line — the border is what defines the panel, not the fill difference.
- Insets *on* a dark-ish panel go **lighter**, not darker, when they carry accent text (the text needs the headroom).
- Measure contrast numerically (write the ratios in a comment next to the tokens), and against the **darkest surface the token can sit on**, not just the page. AA floors: 4.5:1 text, 3:1 large text/UI. A token tuned only for the page fails the moment a panel sits under it.
- Status colour follows meaning: error red only for a genuine failure. A step the visitor can take (allow cookies to submit, complete a field) is neutral — three lines of red for an instruction reads as something broken.
- Check downstream consumers before changing a token — a "success message" color token can be the least legible text on the page after a theme swap.
- When two theming systems layer (global theme call + per-view overrides), application order is load-bearing. Apply overrides AFTER the theme writer and document the order where it happens — the silent failure is overrides that are immediately overwritten.
- Moving tinted bands/washes must not cross body copy wider than a hairline: compositing the tint over the surface can pull text below AA for the seconds the band takes to pass — a failure invisible in any screenshot review.
- The page canvas (html/body background) is itself a design surface on phones: iOS Safari tints the status-bar strip and overscroll from the PAINTED page, not the `theme-color` meta. Give html AND body the chrome color and let the app root paint the content surface (mechanics in rendering.md).

## Typography

- Fluid `clamp()` scale by role (h1 ≈ `clamp(1.75rem, 1.1rem + 2.7vw, 2.8rem)` territory), not arbitrary sizes.
- Measure: body 62–68ch, card/aside text ~36ch. Headings tight (1.1–1.3), body comfortable (1.5–1.75).
- Labels/kickers: small (0.6–0.82rem), uppercase, letter-spacing 0.08–0.14em — the workhorse of the editorial register. (confirmed in 2nd project)
- Slight negative tracking on large display (−0.01 to −0.02em).

## Signature elements

- Every project gets 1–2 signature motifs earned from its content, reused everywhere (project 1: ruled hairlines that draw themselves, § section marks, scan lines, a rotating seal; project 2: the radial network map — hero centerpiece, first-paint intro, and share image are all the same drawing). Don't import a new visual vocabulary per page.
- Card treatment: flat fill one step darker, 1px hairline border, 3px accent top rule; hover = lift (−3 to −5px) + ink-tinted soft shadow (large offset, big negative spread) + border-color.
- The comparison block (pricing) gets the strongest hover on the page — the hovered card must be unmistakable: bigger lift, brighter fill, deepened numerals. Contrast still AA on the brighter fill.
- Decorations painted in a parent's fill to read as cut-outs (perforation notches, punched holes) must follow every fill change of the parent, hover included — otherwise they become visibly wrong-colored patches.
- **Sibling pages that list the same kind of content share ONE layout convention.** Project 1's blog put each section in a horizontal strip showing 3 of 21 posts behind a sideways scroll and a "More" pill, while the media page wrapped every card onto the page; the owner had the blog converted to the media grid (byte-identical CSS). A strip that hides most of a section is a discoverability loss, not a style — keep strips for genuine carousels.
- Landing pages get tighter section rhythm (`--section-y`) than editorial pages — less air between blocks.
- A first-paint intro veil, if the project has one, draws the brand's own motif in system fonts only (a webfont reference would swap mid-intro), stays language-neutral, and holds a minimum beat (~1.6s) so it reads as intentional rather than as jank. Technical contract in rendering.md.

## Motion

- Animation is welcome — what's banned is the AI-obvious kind (see the Motion no-gos above). The test for every device: is it instrumentation specific to this content, or a template effect?
- Instrumentation, not decoration: each animation should depict what the section *does* (a watch service sweeps/scans; a process walks; a registration seals; a network map pulses along its own edges). Reject anything equally at home on an unrelated page. (confirmed in 2nd project)
- Default: one-shot, triggered on arrival (IntersectionObserver), then done. Micro-feedback 150–300ms; draws/reveals 600–1400ms; ease-out enters.
- Loops must earn their place: small area, slow, meaning-bearing ("live" status — a caret, a blip, a scan), visibility-gated so they don't run off-screen, and never on large surfaces or near body copy.
- A loop the visitor is *meant to see* on scroll must not free-run from page load — hold it paused at time zero and release it when its section enters the viewport, else whether they ever see it is phase luck.
- Attention pulses are finite and sinusoidal: 2–3 iterations, never a loop (a hint that keeps blinking becomes furniture). Peak at the keyframe MIDPOINT with sine-in-out easing, so intensity leaves rest and returns at zero velocity — consecutive swells join without a kink; an early peak plus a flat tail reads as a blink followed by dead air. Slow (~1.8s per swell) and shallow (scale lift ≤ ~1.015 — more visibly jumps). Delay the first swell until the host's entrance transition has finished, and restate the resting transform (e.g. `translate(-50%)`) in every keyframe — a transform keyframe replaces the element's transform wholesale.
- When JS hides an element after its CSS animation ends, pair the JS timeout with the CSS timing (delay + duration × count) through one named constant per side, each side's comment naming the other — drift either way cuts a pulse off or leaves the element sitting inert.
- Hint pills ("coach" hints): appear only once the surface has LANDED (never over a still-moving scene), `pointer-events: none`, gone on first interaction or after the fixed pulse count.
- Input grace after an auto-takeover: when the UI opens an immersive surface BY ITSELF at the end of a scroll, ignore residual drag movement for a beat (~0.7s) — the finger that scrolled there is usually still travelling, and its tail otherwise throws the content before the reader has looked at it. A surface the user opened deliberately responds to the very first drag — grace there reads as broken. (Implementation traps in rendering.md.)
- Touch strips (horizontal card scrollers): the trailing-edge fade alone signals "more" on touch — swiping is the obvious gesture, and an overlaid "See more" pill sits on the content it advertises; keep the pill for pointer devices, `display:none` on phones (which also removes it from the tab order). Fade only the TRAILING edge — a leading fade eats the title of the card just scrolled to.
- "Two faces, one control": when a control's job changes with state (hub shortcut becomes Close in fullscreen), swap its face and `aria-label` in place — never stack a second control in the same corner.
- Prefer animating an element that already exists in the markup over injecting ornament; injected ornament is aria-hidden, text-free, pointer-events:none, and born hidden **via JS inline style, never CSS** (SEO rule — see rendering.md).
- One tunable constant for the whole gesture family (e.g. a single `PEAK` opacity) so review can turn the volume down without touching devices. (confirmed in 2nd project: settle-window and pulse timings as single named constants)
- `prefers-reduced-motion`: early-return before anything is created or hidden — the styled static page IS the finished design, zero injected nodes, zero observers. A global CSS kill-switch (`* { animation-duration: 0.01ms !important; … }` under the media query) is the floor UNDER those per-effect returns, not a replacement — belt and braces.
- Touch parity: a hover-only affordance (accent bar, underline wipe) is invisible to touch visitors forever — give it a one-shot on-arrival equivalent. And never WIRE hover states on touch (`matchMedia('(hover: hover)')` gate): mouseleave never fires there, so applied hover styles stick.
- Transition on `transform`/`opacity`, not `width`/`height` (compositor vs per-frame layout). `width: 0 → 100%` and `width: 100%; transform: scaleX(0→1)` are pixel-identical at rest; the transform version is free.
- The short, compositor-only, one-shot style above is also the INP-safe style: long rAF/JS work during an interaction is what pushes INP past 200ms. So the effects tracker's dispose-on-unmount rule (rendering.md) is a performance rule, not just hygiene — stacked loops from old navigations compete with the interaction the visitor is having now.

## Copy

- Write as the brand in first person ("we monitor", "our lawyers"), never as a third party describing the brand — check ported/source copy for this.
- Grammatical number follows meaning: singular for the visitor's own thing and the named service; plural for other people's things and the world in general. Don't flatten one into the other.
- Prices and legal claims get verified with the owner before shipping; in structured data a bare price is a misrepresentation — carry VAT flags and name excluded fees.
- Never smuggle new visible copy in through a styling/animation task. Content changes ship as content changes, with owner sign-off.
- Authoring reminders never live in renderable content fields — a "drop a photo onto each card" note-to-self shipped to visitors in two languages before anyone noticed. Reminders go in code comments; content strings hold only content.

## Soft defaults (starting points, not law)

- Square-corner bias: border-radius only on genuinely circular elements; radius earns its way in per project. (2nd project kept cards/panels square but used pill radii — 999px — for floating touch-HUD elements: hint pill, overlay close control. Radius still only where the element genuinely is a pill or circle.)
- Timing defaults that worked: 3.4s scan cycle, ~1s sweeps, 340/300ms accordion open/close; ~1.8s per attention swell; ~0.7s post-takeover input grace.
