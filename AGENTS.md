<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- The Next.js block above is auto-managed by `next dev`. Do not edit it. -->

## Project rules

- Read `docs/product-spec.md` and `docs/architecture.md` before building features.
- Phase 1 is frontend-only. Do not add a backend, database, auth, or payments.
- Mobile-first, accessible, and bilingual. All user-facing text lives in `src/content`, never hard-coded in components.
- Never invent business facts (prices, hours, addresses, products). Ask instead.
- Keep shared data (e.g., store hours) in one place and reuse it.
- Use the branch and commit naming from `CONTRIBUTING.md`. Never commit or push to `main`.
