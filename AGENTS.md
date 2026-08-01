# Documentation project instructions

## About this project

- This is the documentation site for [Kommerce](https://usekommerce.com), built on [Mintlify](https://mintlify.com)
- Kommerce is an AI brand department: angle research, copywriting, creative production, media buying, and weekly reporting, run as one system with a human operator on every account
- Pages are MDX files with YAML frontmatter
- Configuration lives in `docs.json`
- Requires an LTS Node version — the Mintlify CLI rejects Node 23+. `.nvmrc` pins 22; run `nvm use` before `mint dev`
- Pushing to `main` deploys to production automatically via the Mintlify GitHub App
- Use the Mintlify MCP server, `https://mcp.mintlify.com`, to edit content and settings via MCP
- Use the Mintlify docs MCP server, `https://www.mintlify.com/docs/mcp`, to query information about using Mintlify via MCP

## Terminology

- **Department** — the Kommerce system as a whole. It is "installed", not "signed up for".
- **Operator** — the human assigned to an account. Not "account manager" or "rep".
- **The five jobs** — angle research, copywriting, creative production, media buying, weekly reporting. Refer to them as jobs, not "features" or "modules".
- **Angle** — a claim, audience, or positioning hypothesis worth testing.
- Say **brand**, not "client" or "customer account".
- Kommerce is a managed service. Never describe it as a tool, app, platform, SaaS, or something a user "installs" themselves.

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- No hype adjectives ("revolutionary", "seamless", "cutting-edge"). The source site is plain and direct — match it.

## Screenshots

Full workflow and the outstanding shot list live in `images/CAPTURE-LIST.md` (not published).

- **Both wikis are public with no authentication.** Capture from a demo brand with fabricated data — never a live client account. Brands can read the agency wiki, so a real portfolio screenshot leaks one client's figures to another and to the open internet.
- Check every frame for client names, spend/revenue/ROAS figures, Meta account or pixel IDs, member emails, and browser chrome before committing.
- Files live in `images/<subject>/` — `onboarding`, `creative`, `media-buying`, `meta-audit`. Organised by subject, not by wiki, because most surfaces are identical for both roles and one file serves both pages.
- Root-relative paths only: `/images/creative/foo.png`. Relative paths are unsupported.
- Always wrap in `<Frame>` with a `caption` that says what to notice, and always write real `alt` text.
- Work-in-progress captures go in `images/_wip/` or carry a `.wip.png` suffix — both are mintignored, so an unreviewed frame cannot reach a public deploy.
- **Do not screenshot** reporting dashboards, the brands list, or anything mostly numeric. They carry client data and go stale fastest. A stale screenshot is worse than none because it still looks authoritative.

## Content boundaries

- **Do not publish pricing.** Pricing depends on scope and is set on the call by design. Do not infer, estimate, or reproduce numbers.
- **Do not invent metrics, results, or case studies.** No CAC figures, ROAS claims, or client names unless supplied and approved.
- **Do not document an API, SDK, CLI, or self-serve signup.** None exist. Onboarding runs through a call.
- Do not add integrations to the documented stack (Shopify, Meta, Google, TikTok, Slack, ClickUp) without confirmation.
- Verify claims against [usekommerce.com](https://usekommerce.com) before publishing. When a detail cannot be verified, leave it out rather than hedging in public copy.
