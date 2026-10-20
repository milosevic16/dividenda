---
name: web-deployment
description: "Push-to-build static hosting (GitHub to Netlify/Vercel/Cloudflare Pages): build pipeline, caching and security headers, ordered redirects and 301s, stale-deploy triage, CMS rebuild hooks, robots.txt and AI-crawler access, post-deploy checks. Use when deploying, merging to the production branch, editing redirects, headers or host config, or debugging \"works on one device, broken on another\"."
---

<!-- GENERATED from ~/.claude/rules/deployment.md by ~/.agents/sync-from-claude.mjs — edit the source, then re-run the sync. -->

# Deployment rules — push-to-build static hosting

Reference: GitHub → Netlify, but the rules hold for any push-to-build host (Vercel, Cloudflare Pages).

## The pipeline

- **A push to the production branch IS the deploy.** The host builds from source and publishes the output dir. Built output stays out of version control — production is compiled fresh every push, never hand-uploaded. (confirmed in 2nd project)
- **Pin the build in host config** (`netlify.toml` / equivalent): exact build command, publish dir, and **Node version**. Pinning Node stops a stale host default from breaking the SSG/jsdom build; pinning the command makes "builds from source" an enforced guarantee rather than a UI assumption.
- **Every build generates `sitemap.xml` + `robots.txt` FROM the emitted HTML** (canonical → `<loc>`, hreflang links → alternates; skip 404/noindex pages) — mandatory on every project, and by construction unable to drift from what the pages declare. Discover pages from the output, not a hand-kept list, so new pages join by existing.
- **The blocking assertion suite** (lang/canonical/hreflang/title per page, page-set completeness) is the recommended default — "the build is the CI", a failing guard blocks the deploy, and on a two-page site it's ~a hundred lines. But it is the OWNER'S call: an owner may opt a small hand-tended site down to generation-only after weighing blocked-deploy friction against the rare invisible mistake (project 2 did exactly that; its full guard stays in git history for cherry-pick). Where guards are in: a failure means fix the page, never weaken the assertion. Where they're out: head correctness becomes an explicit in-session verification duty on every route/meta change — write that duty into the project doc.
- When the host's git integration is the whole pipeline, don't add a parallel CI workflow (GitHub Actions) that also builds — two builders drift.
- **Before pushing the production branch: build the merged tree locally.** Merge, `typecheck && build`, verify the output, then push. A clean merge is not a working merge.
- **The host builds on case-sensitive Linux.** An import with the wrong case (`@/components/masthead` for `Masthead.vue`) works on Windows/macOS and fails only the deploy build — one more reason the local `build` before pushing is non-negotiable.
- Branch pushes alone may not produce a preview — know the host's rule (here: Deploy Previews on PRs only, branch deploys off). Open a PR to get a URL; only the production branch deploys to prod.
- Env vars are read at BUILD time — changing one in the host UI does nothing until the next deploy; trigger a redeploy after edits.
- **Netlify free plan + private repo: no `Co-Authored-By` trailers in commits.** The plan allows one Git contributor and counts trailer identities as contributors — a commit carrying one gets the deploy blocked ("unrecognized Git contributor"). Plain commit messages only. (Cost two debugging rounds before it was found.) Plan-dependent, not universal: project 1 deployed normally with a trailer on every commit — check the plan and repo visibility rather than assuming either way.
- Keep a **rollback tag** on the last known-good commit before a big migration. Prefer fix-forward; the tag is the escape hatch.

## Headers & caching

- **Header rules match the REQUEST path, not the file that ends up served.** A `/index.html` rule never covers a visit to `/` (or `/sl` served by `sl.html`). Without explicit rules per HTML-serving path, a browser can hold a stale HTML shell that keeps pointing at long-gone fingerprinted bundles — the "one browser still shows the old site while another is fine" symptom. List every HTML path (`/`, `/index.html`, each locale root and its file) with `Cache-Control: no-cache`.
- Fingerprinted/content-addressed assets (`/assets/*`, `/fonts/*`) get `public, max-age=31536000, immutable` — the filename is the cache key.
- Public-by-design client keys (form-API access keys that ship in the bundle) still live in env vars, never committed (`.env.local` gitignored + host env var) — and the host's secret scanner needs telling: `SECRETS_SCAN_OMIT_KEYS = "VITE_..."` in the host config, or the scanner blocks the deploy for a key that is public on purpose. (One judgment call went the other way: an analytics measurement ID that sits in the static HTML shell was hardcoded — an env var buys no secrecy for a string in every page's source, and adds a failure mode where a missing var silently stops measurement. Form/API access keys stay in env vars.)

## Security headers

- **Ship the baseline set from day one** — they cost nothing on a static host, and they are what a client's IT people scan for:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "frame-ancestors 'none'"
```

- **A full CSP (`script-src`/`style-src` allowlists) is a stretch goal, not a default.** It has to enumerate every captcha/form/CMS origin, the captcha needs `frame-src`, and an inline first-paint veil needs style hashes or `'unsafe-inline'`. Do it deliberately behind a report-only trial, or not at all — a half-built CSP breaks the form and the veil in production only. (JSON-LD `<script>` blocks are non-executing data; CSP doesn't touch them.)

## Redirects

- One ordered redirects file, **first match wins**, three tiers:
  1. Legacy/renamed URLs → canonical, `301`.
  2. Dynamic CMS sections (`/blog/*`) → app shell as a **non-forced `200`** (a real prerendered file wins; only a not-yet-built slug hydrates and client-fetches).
  3. `/* → /404.html 404` — everything else is a REAL 404, never a Home bounce (kills the soft-404 factory). A genuine one-pager may use an SPA rewrite (`/* → /index.html 200`) instead so deep links survive reload — a soft-404 tradeoff taken knowingly, and only there; multi-page prerendered sites keep the real 404.
- Every URL rename adds a 301 — the root AND a `/*` splat with `:splat` for the subtree. **Specific old-slug rules go ABOVE the subtree splat**, or the splat rewrites them to targets that 404.
- Redirects are host-executed: the local preview server does not run them. **Verify 301s only after deploy**, with `curl -sI` against production.

## Stale deploys — the trap and the checks

- **A host project that stops publishing keeps serving its last deploy** — HTTP 200, fresh revalidation headers, frozen bytes. Any device with the old URL (bookmark, home-screen icon, history autocomplete) runs months-old code forever, and no reload fixes it. When a site moves to a new host project/subdomain, retire or redirect the old one the same day.
- First question for every "works on X, broken on Y" report: **which deploy is Y actually running?** Fetch the HTML Y's URL serves, read the hashed asset names, and grep the served bundle for a marker string that only the new code contains. Do this BEFORE code archaeology — it converts "impossible intermittent bug" into "stale URL" more often than not.
- **After every push, verify the deploy landed**: poll production HTML until the new hashed asset name appears, then marker-grep the bundle for the change itself. Never assume; hosts occasionally skip a publish silently (an empty re-trigger commit gets it moving). With code splitting, grep EVERY asset the page references, not just the app chunk — a route's CSS ships in its own chunk (`Blog-*.css`), and grepping only `app-*.css` once reported a live deploy as missing.

## CMS rebuilds

- Build-time-baked content freezes at build: wire a CMS webhook → host build-hook URL on publish/unpublish, filtered to the relevant content types. New content is human-visible immediately via the client fallback and crawlable after the ~2-min rebuild. Tell the owner this timing.

## robots.txt and AI access

- Allow everything **including AI/LLM bots** (GPTBot, ClaudeBot, anthropic-ai, PerplexityBot, CCBot, Google-Extended) and point to the sitemap. AEO is a goal — never disallow the answer engines.
- **robots.txt saying "allow" is necessary, not sufficient — the CDN/WAF can be blocking them anyway.** Cloudflare has blocked AI crawlers BY DEFAULT for new customers since mid-2025 and runs a pay-per-crawl model on top; a "bot protection" toggle can serve 403s and challenge pages while your robots.txt reads wide open. After ANY host, CDN, DNS or security change: `curl` production with each AI bot's UA and expect 200 + real content, not a challenge. Verify the door is open at the infrastructure layer, not just in the file.
- **llms.txt: skip it, deliberately.** Adoption grew ~9× through mid-2026, but server-log studies across 137k domains found ~97% of these files get zero requests, and Google/OpenAI/Anthropic all say they don't consume it. Revisit only if a major platform commits. (If a client asks for it, it's a ten-minute add that can't hurt — just don't count it as SEO work.)

## Post-deploy checks

- `curl -sI` the renamed/legacy URLs → expect 301 chains ending 200.
- Fetch a page with an AI-crawler UA and confirm real content with no JS.
- Marker-grep the served JS/CSS for the strings this deploy introduced (see Stale deploys).
- Google Search Console: submit the sitemap; after a domain migration, verify the old domain and use the change-of-address flow. (Out-of-repo, easy to forget — put it on the launch checklist.)
- **Bing Webmaster Tools alongside GSC**: verify the site and submit the sitemap there too. ChatGPT search and Copilot draw substantially on Bing's index, so this is the cheapest AEO insurance there is. Optional: enable IndexNow for instant Bing/Copilot pickup of new URLs.
- Check the baseline security headers actually arrive (`curl -sI` — host config can be overridden by a proxy or a UI setting).
- **Vendor-plan behaviors get re-verified on every plan or host change** — contributor counting, preview-deploy rules, secret scanning, bot protection. These are facts about a vendor's pricing tier, not about the web, and they change without deprecation notices.

