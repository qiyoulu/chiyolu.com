# chiyolu.com

Portfolio site for **Chiyo Lu** — brand identity & systems designer. Static, dependency-free front end deployed on Cloudflare Pages.

Built by hand: no framework, no build step. The entire site is three source files in `public/`.

## Project status

**Live in production.** Latest build serves at `https://chiyolu.com` (custom domain) and `https://chiyolu.pages.dev` (Pages alias). All deploys go to the `main` production branch.

## Stack

| Layer    | Choice                 | Notes                                                        |
| -------- | ---------------------- | ------------------------------------------------------------ |
| HTML     | Hand-written `index.html` | Single page, no templating, no framework                     |
| CSS      | Hand-written `styles.css` | Custom property–driven typographic system (see below)        |
| JS       | Vanilla `script.js`    | Theme toggle, dynamic footer year. No dependencies            |
| Hosting  | Cloudflare Pages       | `wrangler pages deploy public` (project: `chiyolu`)          |
| Domain   | `chiyolu.com`          | Custom domain on the Pages project; also serves the preview alias |

### Fonts (self-hosted, `public/fonts/`)

- **Ocula** — custom Rotunda-derived display face (Chiyo Lu). Single weight. Used for the `.mark` wordmark.
- **Input Sans** — David Jonathan Ross. Regular/Medium/Bold/Light weights. Body, UI, labels.

Licensed and self-hosted as `woff2`. Do not swap hosting, weights, or files without checking the license terms.

## Directory structure

```
public/
  index.html          # single page: header (mark + statement), work index, footer
  styles.css          # all styling, custom-property token system
  script.js           # dark mode + year
  fonts/              # self-hosted Ocula + Input Sans woff2
  favicon*.svg|png    # themed light/dark monogram favicons
  og-image.png        # social share card
  .well-known/bimi.svg# BIMI verification record
```

## Develop

No install needed to view — `public/` is plain static files:

```sh
python3 -m http.server 4173   # serve public/
open http://localhost:4173
```

`npm install` only pulls `wrangler` (dev dependency) for deploying.

## Deploy

```sh
npm run deploy                 # = wrangler pages deploy public
# or explicitly:
npx wrangler pages deploy public --project-name chiyolu --branch main
```

- Deploys the **entire `public/` directory** — all fonts, favicons, og-image included.
- `--branch main` = production deployment; custom domain updates immediately.
- Deployment returns a unique preview hash URL (e.g. `https://<hash>.chiyolu.pages.dev`) plus the stable production URL.

> Browser caching note: asset filenames (e.g. `styles.css`) are versionless. After a deploy, users with a cached copy must hard-refresh (⌘⇧R). If this becomes a recurring issue, bump the asset filename rather than the content.

## Project identity & invariants

This section is for LLM agents and human maintainers alike. **Do not break these rules without explicit user approval.**

### Wordmark (`.mark`)

- Text: `Chiyo Lu`, single line, `font-family: Ocula`.
- **Font-size is a fixed `64px` at ALL viewport widths** (explicit user decision, 2026-08-08). There is deliberately NO responsive scaling and NO mobile breakpoint override. Do not reintroduce `clamp()` or a `@media` size reduction for `.mark` — the user wants to tune sizes themselves.
- Uses `text-wrap: balance`.

### Typographic token system

`styles.css` implements a factor-of-2 typographic scale via custom properties (mirrors the skillit-bds token logic):

- Size doubles per tier (`--text-1x: 16px → --text-2x: 32px → --text-4x: 64px`).
- Weight steps up per doubling; leading tightens; tracking loosens −0.02em per doubling from the 1x base.
- Weight primitives are named once (`--weight-regular` etc.) and referenced everywhere.
- **Functional scale** (`--text-0-75x: 12px` labels/captions) sits *outside* the doubling formula and uses *open* tracking — small caps need air, not grip.

### Structure & accessibility

- Heading order is `h1` (`.mark`) → `h2` ("Selected Work"). Preserve it.
- External links (LinkedIn, all 5 project rows) use `target="_blank" rel="noopener"` plus a screen-reader-only `(opens in a new tab)` hint. The hint uses `clip-path: inset(50%)` sr-only styling — do not regress this to a visible technique.
- `:focus-visible` outlines exist for links/buttons and `.index-row` (outline pulled inward via `outline-offset: -4px`).
- Dark mode: FOUC guard in `<head>` sets `data-theme` pre-paint; `script.js` persists choice in `localStorage` and follows `prefers-color-scheme` when unset. `theme-color` meta updates in step.
- `prefers-reduced-motion` is respected.

### Layout specifics

- `header` / `section` / `footer` all share the content column: `max-width: 1200px; margin: 0 auto; padding: 0 40px` (mobile: `0 20px`). Footer inherits the same column — margins should stay consistent with the page.
- `.index-row` grid: desktop `56px 1fr 340px 20px`; mobile (≤768px) collapses to `32px 1fr` with areas `"num title" / ". blurb"`.
- Contact-link hover underline: `text-underline-offset: 2px`.

### Metadata / SEO

- Canonical: `https://chiyolu.com`.
- Title, og:title, h1 subhead, meta description all read **"Brand Identity & Systems Designer"** — keep this exact phrasing consistent across all locations (it was aligned deliberately).
- JSON-LD `Person` schema in `<head>` (name, jobTitle, url, sameAs LinkedIn, email).
- BIMI + themed favicons configured; og-image is 1200×630.

### Copy

Project-row subtitle pattern: **reframe — em dash — mechanism** (e.g. "The Journey as Destination — repositioning Amtrak from a utilitarian transit service to an experiential travel brand."). Each row is: number, title, `small` subtitle, blurb of discipline tags, arrow.

## Known considerations

- Cloudflare edge **email protection obfuscates the mailto link** on the custom domain (renders `__cf_email__` + decode script; the `.pages.dev` alias shows the plain link). It's cosmetic and leaves the address readable via JS, but if you'd rather the raw mailto show, disable email obfuscation in the Pages project settings.
- Footer credit: "Set in Ocula by Chiyo Lu and Input by David Jonathan Ross" — keep the font credits accurate if fonts change.
