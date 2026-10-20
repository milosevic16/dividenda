---
name: web-workflow
description: "Working rules for website projects: project docs shared across agents (AGENTS.md/CLAUDE.md), typed bilingual content modules, translation handoff, landing-page clusters, accessibility (WCAG 2.2, EAA), git/commit/merge discipline, tooling habits, verification discipline, scoping judgment. Use when structuring content or i18n, doing accessibility work, committing or merging, verifying a change, or deciding what is in scope."
---

<!-- GENERATED from ~/.claude/rules/workflow.md by ~/.agents/sync-from-claude.mjs — edit the source, then re-run the sync. -->

# Workflow rules — websites

Everything that isn't design, rendering, or deployment: structure, content modeling, a11y, git, tooling, verification habits.

## Source of truth & structure

- `src/` is the source of truth. One-time generators/extractors (porting scripts, scaffolds) are **never re-run** after hand-edits exist — keep them only as historical record, and say so at the top of the project docs AND in a loud header comment in the script itself ("ONE-SHOT. DO NOT RE-RUN."). (confirmed in 2nd project)
- **One project doc for every agent.** Codex (and most other coding agents) read `AGENTS.md`; Claude Code reads `CLAUDE.md` and supports `@path` imports. Keep the content in `AGENTS.md` and make `CLAUDE.md` the single line `@AGENTS.md` — never two docs that drift. Codex has NO import mechanism and caps ALL instruction files at **32 KiB combined** (the global `~/.codex/AGENTS.md` plus every `AGENTS.md` from the repo root down; it stops adding files at the cap, so an oversized global file silently drops the project's own doc). Keep always-on docs small and put long reference material in skills — `SKILL.md` is one shared format (the open Agent Skills standard): `.agents/skills/` for Codex, `.claude/skills/` for Claude, body loaded on demand.
- The project doc (AGENTS.md / CLAUDE.md) has a lifecycle: during initial build-out it is the **spec** — when a task first needs a described piece that doesn't exist yet, create it in that shape, not preemptively. Afterwards it is the **map**. Say which mode it's in, in the doc itself.
- Copy lives in **typed content modules** (one per page), never inline in components. Components render; content files own every visible string. This is also what makes "assert every string is in the built HTML" scriptable. (confirmed in 2nd project)
- The locale union type is the enforcement point: `Localized<T> = Record<Locale, T>` means a content module missing a locale key fails typecheck (the "no untranslated strings" guarantee) — and deleting a field from the shared interface makes every locale still carrying it fail too, so removals are safe in one pass. Adding a language stays additive: widen the union, let typecheck list every missing block.
- Type fixed-length lists as tuples (`[Step, Step, Step]`) so content edits that break layout assumptions fail typecheck.
- Derive counts from `items.length` at render; never store a count next to a list (it goes stale).
- Languages with multiple plural forms (Slovenian: one/two/few/many) get a `PluralForms` shape and a `plural()` helper — never a single hardcoded noun form next to a number.
- Shared constants (URLs, phone, org data) live in ONE module; org/legal facts (address, VAT, phone) come from verified constants only — never invent, omit until confirmed.
- Visible copy must not contradict the site's structured data (e.g. the address in a footer vs the org JSON-LD emitted into the same page).
- **Machine identifiers stay English in every locale**: keys that become email subjects, analytics values, DOM ids/`data-*` hooks, or lookup keys never localize — only their labels/hints do. The owner's inbox and data stay sortable across languages.
- Authoring reminders ("drop the photo here", "still waiting on images") never live in renderable content fields — they ship. Comments, or nothing.

## Translation handoff (owner fills in a document)

- Generate the translation document FROM the content modules by **evaluating them** (bundle the TS to ESM with esbuild, import, walk source and target locales in lockstep) — never by hand-copying or regexing the source. Hand-built lists drift; evaluated ones can't.
- One block per string: a field label the owner understands ("Naslov kartice"), the source text, the existing draft (marked as draft, visually secondary), and a blank ruled line for the final. Group under headings carrying the content's own names (the accordion entry's label, the card's title) — "Entry 3" tells the owner nothing.
- Machine identifiers (slugs, hrefs, mail-subject keys, DOM targets) are excluded from translation and, where shown for context, explicitly marked "do NOT translate".
- **Verify completeness mechanically**: extract the generated document's text and assert every translatable source string appears in it (normalize whitespace/curly punctuation first). "All the content" is the deliverable; a silent drop is the failure mode.
- Headings and field labels are the merge-back keys — tell the owner not to rename them.

## Isolated landing/ad clusters

A pattern worth reusing: a campaign cluster inside a bigger site —
- Reachable by URL only: **no links from the main site's nav/footer in**, minimal links out (logo stays in-funnel, terms link is the one legal exit).
- Reduced chrome (own masthead/footer components), but still fully indexable: own canonicals, own structured data, in the sitemap.
- One inquiry form for the cluster; subpage CTAs deep-link to it rather than duplicating forms.
- Its motion/visual vocabulary may extend the site's, but its palette stays the site's own.

## Accessibility

- **WCAG 2.1 AA is the floor on any EU consumer-facing build**; note the European Accessibility Act (in force since June 2025, standard EN 301 549) in the project doc. Whether a specific client is legally in scope is their lawyer's call, not yours — microenterprise exemptions exist and interpretations vary. Build to the floor regardless; it's cheaper than retrofitting.
- **First focusable element on every page: a "skip to content" link**, visually hidden until focused. Keyboard users should not tab the masthead on every page.
- WCAG 2.2 deltas worth naming (it's the reference standard now): a focused element must never sit hidden under sticky chrome (2.4.11) — pair every fixed header with `scroll-margin-top`/`scroll-padding` on focus targets, and spot-check by tabbing the page, watching that the focused thing is VISIBLE and not merely focused. Never ask for the same information twice in one flow (3.3.7). Never make a cognitive puzzle the only gate (3.3.8 — a degrade-open captcha satisfies this by default; under an owner-chosen strict captcha, the alternative contact route named in every blocked-submit message does — rendering.md).
- Native elements first: `<details>/<summary>` for disclosures (content stays in the DOM closed — crawlers read it, keyboard works, JS only animates the close direction that CSS can't).
- `aria-label` REPLACES the accessible name — it must be a superset of the visible text (WCAG 2.5.3). A bare "Call us" label on a phone link erases the number for screen-reader users.
- Decorative markers inside interactive elements get `aria-hidden` so the button announces cleanly ("FAQ, 10 questions", not "§ 05 FAQ…").
- All decorative/injected ornament: `aria-hidden="true"` + `pointer-events: none`.
- Honor `prefers-reduced-motion` everywhere; visible `:focus-visible`; hit targets ≥ 44px (deliberately stricter than WCAG 2.2's 24px minimum — keep the stricter number); meaning never in color alone.
- A canvas scene is pixels with no semantics: mirror it with a visually-hidden button layer (one per interactive node, real `aria-label`s, Enter/Space activate) and draw the focus ring back onto the canvas from the buttons' focus events.
- Fullscreen overlays are dialogs: `role="dialog"` + `aria-modal`, focus moves in on open and RETURNS to the invoker on close (`preventScroll` — a plain `focus()` scroll-reveals the button inside the scroll-locked document), Tab is trapped, Escape closes.

## Git & review

- Commit messages in prose: what changed, WHY (the reasoning that will be forgotten), and what was verified. A future reader should not need the chat log. (confirmed in 2nd project — its history reads as the project's engineering log)
- Behaviour-identical refactors ship in their own commits, never mixed into feature diffs — mixing makes review unable to tell refactor from behaviour change.
- Diagnostic apparatus gets the three-commit lifecycle: (1) land the instrument as its own commit, (2) land the fix it found, (3) remove the instrument — and verify the diff from pre-instrument to final reduces to exactly the fix. The instrument commit stays in history for one-command revival (cherry-pick) next time.
- Feature branch → PR (gets the preview URL) → merge to production branch. Before pushing production: build the merged tree locally and verify the output.
- Dry-run merges (`git merge-tree --write-tree`) and check divergence both directions before merging.
- **Merging or pushing to the production branch happens only on an explicit instruction for THAT change** — it is the deploy. The resting state for finished work is a pushed branch + PR (preview URL); approval of one merge doesn't carry to the next. "Don't push yet" means commit locally and stop.
- When told to keep/revert to an approved state, treat that state as frozen — later work builds on it, it doesn't re-litigate it (three rejected palette attempts ended in "return to the original and keep that"; the lesson is to stop proposing re-themes after approval).

## Tooling habits (Windows-flavored, mostly portable)

- Multi-edit scripts: write a Node script to a scratchpad file and run it — inline `bash -c` / PowerShell one-liners mangle backticks, `$`, and regex character classes. (confirmed in 2nd project)
- Multiline commit messages the same way: write the message to a file and `git commit -F <file>` — a here-string across tool boundaries gets its quoting mangled and git reads the body as pathspecs.
- Every edit script normalizes newlines against the target file's CRLF/LF before matching — `git checkout` can flip line endings and every exact-match edit silently misses.
- Edit scripts fail LOUDLY on a missed match (`MISS in <file>: <needle>` + non-zero exit) instead of continuing half-applied.
- `cp a b || cp a c` fallback chains are a footgun: the first success skips the fallback you actually wanted. Back up to ONE explicit path and verify it exists.
- Prefer exact-string edits with unique context over regex/line-number edits; verify count of replacements.
- One-off scripts that need the repo's node_modules but live outside the repo (scratchpad): import by absolute `file:///` URL — bare specifiers resolve from the script's own directory and miss.

## Verification discipline

- Verify on the BUILT output, never the dev server (dev runs JS and always looks fine). The full checklist lives in rendering.md ("Verify like a crawler").
- Distinguish environment artifacts from real bugs before "fixing": a non-compositing preview renderer freezes animations at frame 0, never delivers IntersectionObserver callbacks, and fails screenshots; background panes throttle timers to ~1fps. First disable transitions / force `.finish()` / drive observers via a hand-rolled shim / take over the clock (virtual `performance.now` + manual frame pump — rendering.md), then judge.
- Report honestly what was measured vs seen. If you never visually rendered the page, say so — and hand the aesthetic judgment (is the effect too strong? too busy?) to the human with a named tuning knob.
- **Quantify UI bugs before fixing them, and re-measure after.** "Thrown somewhere random" becomes "button drifts −1162px, correction 0"; the fix is proven when the number reads 0, not when it looks right. In-page JS measurement beats screenshots for this.
- **Triage order for "works on X, broken on Y":** (1) which BYTES does Y run — deploy/URL staleness first (deployment.md); (2) which ENGINE — all iOS browsers are WebKit, so Safari-vs-Brave on one iPhone isolates the Safari app layer, and desktop devtools "mobile" emulation is Blink pretending; (3) only then the code.
- Anything touching effects: navigate away and back TWICE — no doubled animations, stacked listeners, or accelerating loops.
- Anything touching a form: submit for real and confirm delivery arrives, and that the honeypot/validation reject paths behave.
- A "done means" checklist in the project doc (typecheck+build clean; visual check desktop + ~375px; console free of new errors; the two checks above; honest reporting of anything skipped) keeps "done" from meaning "compiles".
- After any hover/interaction styling: force the hovered geometry on all elements simultaneously and re-check overflow at narrow widths.
- Numeric contrast checks in-page (compute luminance ratios against the actual tokens) — never eyeball.

## Scoping & judgment calls

- An "add animation" ticket never adds visible copy, new visual elements, or content claims — those are content changes needing owner sign-off (a deadline countdown proposed as animation was correctly killed as a *content* change with legal implications).
- When a review/design process surfaces a pre-existing live bug (out of ticket scope), fix it as its OWN commit with its own verification, and tell the owner you'd previously reported the buggy behaviour as correct — corrections beat quiet fixes.
- Port content accuracy > source fidelity: when porting from an old site, fact-check claims that age (fees, procedures, legal terms) and flag corrections to the owner rather than silently copying or silently fixing.
- Client-supplied legal terminology is authoritative even when technically imprecise — restore it verbatim and flag the discrepancy in a comment (e.g. "razveljavitev" vs nullity-action distinction).
- **Every new third-party script is also a content change.** Analytics, embeds and chat widgets set cookies and add a processor — so before merging, measure what the script actually sets (`document.cookie`, storage) and grep the shipped cookie notice, privacy policy and processor list for claims it falsifies. Project 1: GA4 set `_ga` and `_ga_<id>` on the first load, making the live "our only third party is hCaptcha" untrue on deploy. Report the contradiction even when the legal copy is someone else's job.
- When the user reports a bug you "already fixed", first check the fix actually REACHED them (pushed? deployed? their cache?) before reopening the code — an unpushed local commit reads identically to a failed fix from their side.

## Soft defaults (starting points, not law)

- Desktop-first `max-*` breakpoint variants (matching ported legacy media queries) — an artifact of the port; greenfield projects can go mobile-first.
- The specific scratchpad/edit-script workflow may be superseded by better tooling; the LOUD-fail and CRLF rules within it are the durable part.

## Unverified

- The 2nd project ran with **no test suite and no linter** (verification = typecheck + build + browser) and stayed healthy at its size. Whether that scales past a one-page site is unproven; treat as a small-site allowance for tests/linters. Sitemap/robots generation is mandatory in every build; the blocking assertion suite is recommended but owner-optable (deployment.md) — where it's opted out, head checks are an explicit in-session duty.
- Per-view runtime token application with **no cleanup by design** (next view overwrites) worked across two projects but has a known sharp edge (a var only one page sets leaks to the next). If a project ever mixes light/dark page palettes heavily, revisit whether tokens should reset per view.
