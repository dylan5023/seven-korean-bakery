# Architecture

Phase 1 is a frontend-only site. There is no backend, database, auth, or payments. See [product-spec.md](product-spec.md) for features and [plan.md](plan.md) for scope.

## Tech stack

Versions as installed (`package.json` / `npm ls`):

| Tool                 | Version                                 |
| -------------------- | --------------------------------------- |
| Next.js (App Router) | 16.3.8                                  |
| React / React DOM    | 19.2.8                                  |
| TypeScript           | 5.9.3                                   |
| Tailwind CSS         | 4.3.3 (via `@tailwindcss/postcss`)      |
| ESLint               | 9.39.5 (`eslint-config-next` 16.3.8)    |
| Prettier             | 3.9.9 (`eslint-config-prettier` 10.1.8) |
| Package manager      | npm                                     |

Next.js 16 differs from older versions. See `AGENTS.md` and the docs bundled in `node_modules/next/dist/docs/` before writing framework code.

## Folder structure

```text
src/
  app/
    globals.css          Global styles (Tailwind)
    [locale]/            Routes for "ko" and "en"
      layout.tsx         Root layout: <html lang>, fonts, metadata
      page.tsx           Placeholder page showing the site title
  components/
    ui/                  Reusable primitives (empty for now)
    sections/            Page sections (empty for now)
  content/
    ko.ts, en.ts         All user-facing text per language
    index.ts             getContent(locale)
  lib/
    locales.ts           Supported locales and the default locale
    analytics.ts         No-op trackEvent() placeholder
docs/                    Product spec, architecture, plan
next.config.ts           Static export and unoptimized images
scripts/cloudflare-pages.mjs  Generate the Pages root redirect after build
.nvmrc                   Node.js 24 for local and Pages builds
```

## Locale routing and default language

- Supported locales (`ko`, `en`) and the default are defined in `src/lib/locales.ts`.
- On Cloudflare Pages, `/` redirects temporarily (302) to `/<defaultLocale>`. The `postbuild` script generates `out/_redirects` from `defaultLocale`; no Next.js server is needed.
- `next dev` does not apply Pages redirect rules; open `/ko` or `/en` directly during development.
- `src/app/[locale]/layout.tsx` validates the locale (unknown values return 404), sets `<html lang>`, and pre-renders both locales with `generateStaticParams`. `dynamicParams = false` restricts routes to these locales.
- To change the default language, edit `defaultLocale` in `src/lib/locales.ts`. No i18n library is used yet.

## Cloudflare Pages hosting

TTEOK-10 configures a static export (`output: "export"`). Run `nvm install` and `nvm use` to select Node.js 24 from `.nvmrc`, then `npm ci` and `npm run build`. Node.js 24 also supports the postbuild script importing the shared TypeScript locale configuration directly.

Configure the Cloudflare Pages project with:

- Framework preset: **Next.js (Static HTML Export)**.
- Root directory: repository root.
- Build command: `npm run build` (includes `postbuild`).
- Build output directory: `out`.
- Node.js: `.nvmrc` selects 24; remove any conflicting `NODE_VERSION` override.

The export includes `ko.html`, `en.html`, and a top-level `404.html`. Pages serves the locale files at `/ko` and `/en`. Keeping `404.html` disables Pages' SPA fallback, so `/fr` and other missing paths return HTTP 404. The only redirect rule is the exact root path; do not add a catch-all rewrite to a homepage.

`next/image` uses `images.unoptimized: true` and serves original image assets without the server-only image optimizer. Google fonts are downloaded during the build, so the build environment needs network access. No Workers, Pages Functions, database, or runtime adapter is required.

`npm start` (`next start`) is not supported for a static export. To test Pages routing locally, run `npx wrangler pages dev out`, then check `/` (302 to `/ko`), `/ko` and `/en` (200 with the correct HTML language), and `/fr` (404). A generic static file server does not necessarily implement Pages' extensionless URLs or `_redirects` rules.

Repository configuration does not create a Pages project or attach a domain. After connecting the repository in Cloudflare, verify the same routes on its preview URL before launching the chosen domain.

References: [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/), [redirect rules](https://developers.cloudflare.com/pages/configuration/redirects/), [static serving and 404 behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/), and [build image / Node version](https://developers.cloudflare.com/pages/configuration/build-image/).

## Content

- Each language has one file: `src/content/ko.ts` and `src/content/en.ts`. `en.ts` is typed against `ko.ts`, so a missing key is a type error.
- Pages call `getContent(locale)` from `src/content/index.ts` and render the result. Components must not hard-code user-facing text.
- Shared business data (e.g. store hours) should live in one module and be reused. It does not exist yet.

## Future integration points (not implemented)

- **Form submission service** for the Custom Order form: not implemented, service undecided.
- **Analytics:** `trackEvent(name, props)` in `src/lib/analytics.ts` is a no-op stub. No provider is connected.
- **CRM** (HubSpot) and automation (n8n): not implemented. Phase 2 / Later.

## Folder and data flow

```mermaid
flowchart LR
  Req["Request /, /ko or /en"] --> Next["Cloudflare Pages<br/>out/_redirects: / → defaultLocale"]
  Locales["src/lib/locales.ts<br/>locales, defaultLocale"] --> Next
  Next --> Layout["app/[locale]/layout.tsx<br/>validate locale, html lang"]
  Locales --> Layout
  Layout --> Page["app/[locale]/page.tsx"]
  Page --> GC["content/index.ts<br/>getContent(locale)"]
  GC --> Ko["content/ko.ts"]
  GC --> En["content/en.ts"]
  Page --> Comp["components/sections + ui"]
  Comp -.->|future| Analytics["lib/analytics.ts<br/>trackEvent (no-op)"]
```
