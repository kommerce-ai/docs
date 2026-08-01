# Kommerce docs

Documentation for [Kommerce](https://usekommerce.com), built on [Mintlify](https://mintlify.com).

Live site: [kommerce.mintlify.app](https://kommerce.mintlify.app)

## Development

The Mintlify CLI **does not run on Node 23+**. This repo pins Node 22 in `.nvmrc`.

```bash
nvm use && npm i -g mint && mint dev
```

The preview runs at `http://localhost:3000`.

Check links before pushing:

```bash
mint broken-links
```

## Project layout

| Path | Purpose |
| --- | --- |
| `docs.json` | Site config — name, colors, fonts, navigation, redirects, footer |
| `index.mdx`, `quickstart.mdx` | Public marketing pages |
| `agency-wiki/` | Product wiki for agency users |
| `brands-wiki/` | Product wiki for brand users |
| `favicon.ico` | Site favicon |
| `AGENTS.md` | Instructions for AI coding tools working in this repo |

## Access control

> **Everything on this site is PUBLIC, including `/agency-wiki`.** The split between the two wikis is organisational only — it is not a security boundary. Anyone with the URL can read either one.

Access control is **deliberately not applied yet**, because applying it without authentication configured makes things worse rather than better: the `groups` frontmatter hides pages from the site navigation, but does **not** block direct URL access. The result would be a site where the wiki tabs have vanished for everyone while the pages remain publicly readable.

### Turning it on

Two things must be true, in this order:

1. **Enable authentication in the Mintlify dashboard** — JWT, OAuth, password, or Mintlify-managed access. Once enabled, every page requires login *except* those marked `public: true`.
2. **Have the app send the user's role as Mintlify `groups`** — in the JWT payload, or from the OAuth Info API endpoint. The app's `userType` (`brand` / `agency` / `agency_member`) maps onto these group names.

**Only then** add the frontmatter below. `index.mdx` and `quickstart.mdx` already carry `public: true`, so the marketing pages stay open.

| Content | Frontmatter to add | Who gets in |
| --- | --- | --- |
| `index.mdx`, `quickstart.mdx` | `public: true` *(already set)* | Everyone, no login |
| `brands-wiki/*` | `groups: ["brand", "agency", "agency_member"]` | Brand and agency users |
| `agency-wiki/*` | `groups: ["agency", "agency_member"]` | Agency users only |

List **both** `agency` and `agency_member` wherever agency access is granted. They are distinct user types in the app, and omitting `agency_member` locks out agency staff if the JWT emits the raw `userType` instead of collapsing it to `agency`.

A user whose groups don't match a page gets a 404. Unauthenticated users can't reach any non-public page.

Legacy `/product/agency/*` and `/product/brand/*` paths redirect to the new locations.

Adding a page means creating the `.mdx` file and registering it under `navigation.pages` in `docs.json`. A page that isn't in `docs.json` won't appear in the sidebar.

## Branding

Colors in `docs.json` are taken from usekommerce.com:

- `primary` / `dark` — `#00071A`, the Kommerce action color (used in light mode)
- `light` — `#EAFF5E`, the accent (used in dark mode, where `#00071A` would be invisible)

There is no logo image. The site name renders as a text wordmark in Inter, matching usekommerce.com. To use an image instead, add a `logo` key pointing at an SVG.

## Publishing

The Mintlify GitHub App is installed on this org. **Pushing to `main` deploys to production automatically** — open a PR if you want a preview first.

## AI-assisted writing

Install Mintlify's documentation skill for Claude Code, Cursor, and other tools:

```bash
npx skills add https://mintlify.com/docs
```

Project-specific conventions — terminology, style, and what must not be published — live in [`AGENTS.md`](./AGENTS.md).

## Troubleshooting

- **`mintlify is not supported on node versions 25+`** — run `nvm use` to switch to Node 22.
- **Dev server won't start** — run `mint update` for the latest CLI.
- **Page 404s** — confirm you're in the folder with `docs.json`, and that the page is listed in `navigation.pages`.
