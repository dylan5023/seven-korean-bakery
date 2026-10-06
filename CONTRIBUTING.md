# Contributing

## Workflow

Jira ticket → branch → PR → review (1 approval) → squash merge → Done

## Naming

| Item   | Format                         | Example                           |
| ------ | ------------------------------ | --------------------------------- |
| Branch | `feature/TTEOK-12-short-name`  | `feature/TTEOK-12-home-hero`      |
| Branch | `fix/TTEOK-12-short-name`      | `fix/TTEOK-12-mobile-nav-overlap` |
| Commit | `TTEOK-12 Short description`   | `TTEOK-12 Add home hero section`  |
| PR     | `[TTEOK-12] Short description` | `[TTEOK-12] Add home hero`        |

Never commit or push directly to `main`.

## Pull request description

Use these four headings:

- **What** – what changed and why
- **How to test** – steps to verify the change
- **Notes** – trade-offs, follow-ups, open questions
- **Jira key** – e.g. `TTEOK-12`

## Jira conventions

- Labels are lowercase: `phase-1`, `phase-2`, `later`, `dev`, `copy`, `design`, `seo`, `a11y`, `content-needed`.
- Story points are estimated on Stories only.

## Secrets

This repository is public. Never commit secrets, API keys, or tokens. Keep local values in `.env.local` (all `.env*` files are git-ignored).

## Before opening a PR

```bash
npm run lint
npm run build
npm run format:check
```

## AI tools

AGENTS.md is the single source of project rules.
