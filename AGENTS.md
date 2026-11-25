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
- **Operator** — the party running accounts on the brand's behalf, and also the individual human assigned to an account. Not "agency", "account manager" or "rep". Operator material lives under `/operator-wiki` (the Reference tab) and `/kommerce-101` (the course tab). The brands wiki was retired; its URLs redirect.
- **Do not say "agency"** in published copy. The one exception is the product's own control labelled **Copy agency ID** in the Meta connection flow — quote that label verbatim, because renaming it in the docs would contradict what the user sees on screen. If the product UI is ever renamed, drop the exception.
- **The lifecycle** — client onboarding, audit and research, creative testing, scaling. This is how the operator wiki is organised; follow it rather than inventing other groupings.
- **Angle** — a claim, audience, or positioning hypothesis worth testing.
- Say **brand**, not "client" or "customer account".
- Kommerce is a managed service. Never describe it as a tool, app, platform, SaaS, or something a user "installs" themselves.

## Audience

The operator wiki is read by **media buyers and account managers, not engineers**. Write for them:

- Use the words the product shows on screen, not the names in the code. "Winner: move it to scale", not `propose_graduation`.
- Spell out numbers in context — "two and a half times break-even CPA" beats `2.5 × C`.
- No state-machine arrows, enum values, or backticked internal identifiers. Exceptions are things a reader actually types or sees, like an `act_` ad account id.

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, and code references
- No hype adjectives ("revolutionary", "seamless", "cutting-edge"). The source site is plain and direct — match it.

## Kommerce 101 (the course tab)

The site has two tabs. **Kommerce 101** is a sequenced course; **Reference** is the 24-page wiki.

- **Lessons stay thin.** A lesson carries learning outcomes, a short teaching core, an interactive piece, two knowledge checks and a link into the reference page that holds the full prose. Never copy reference prose into a lesson — the reference is canonical, and duplicated prose drifts.
- Every module ends in a **checkpoint**: something the reader does on the demo brand, never on a live client account.
- Lesson ids are `m<module>l<lesson>` (`m3l2`). They key the progress object and must not be renamed once published, or readers lose their ticks.
- Progress lives in `localStorage` under `kommerce101.progress.v1`, checkpoints under `kommerce101.checkpoint.m<module>`. Per-device, invisible to anyone else. Only a submitted checkpoint is a record.
- `LessonComplete` carries a hardcoded `TOTAL_LESSONS`. Raise it when a module lands.

### Writing React components for Mintlify

Components live in `/snippets/*.jsx` and are imported by name into MDX.

- **Every component must be self-contained.** Mintlify compiles each exported component in isolation, so a component cannot reference anything declared at the top of its file — not a helper, not a constant, **not even when that binding is itself exported**. It compiles, the page returns 200, and then it dies in the browser with `x is not defined`. Repeat the constant inside each component that needs it.
- Hooks (`useState`, `useEffect`, and the rest) are pre-injected. Do not import them.
- Named exports only. No default exports, no JSON imports, no `React.lazy`.
- npm packages need an Enterprise plan. Everything here is written to avoid them.
- Write Tailwind class names out in full. Mintlify only generates CSS for classes it can see in the source, so `` `bg-${colour}-500` `` produces nothing.
- Wrap `localStorage` reads and writes in `try`/`catch`, and render a fixed-height placeholder until the first read lands, so the UI never flips in front of the reader.
- **A 200 response does not mean the page works.** Component failures are client-side. Load the page in a browser and read the console before calling it done.

### Walkthrough videos

Use `<Walkthrough id="..." title="..." />` from `/snippets/course.jsx` for Loom, or add `source="youtube"`. Pass only the video id. The screenshot rules below apply to every frame of a recording, including browser chrome and anything visible in a tab title.

## Screenshots

Full workflow and the outstanding shot list live in `images/CAPTURE-LIST.md` (not published).

- **Both wikis are public with no authentication.** Capture from a demo brand with fabricated data — never a live client account. Brands can read the operator wiki, so a real portfolio screenshot leaks one client's figures to another and to the open internet.
- Check every frame for client names, spend/revenue/ROAS figures, Meta account or pixel IDs, member emails, and browser chrome before committing.
- Files live in `images/<subject>/` — `onboarding`, `creative`, `media-buying`, `meta-audit`. Organised by subject, not by wiki, because most surfaces are identical for both roles and one file serves both pages.
- Root-relative paths only: `/images/creative/foo.png`. Relative paths are unsupported.
- Always wrap in `<Frame>` with a `caption` that says what to notice, and always write real `alt` text.
- Work-in-progress captures go in `images/_wip/` or carry a `.wip.png` suffix — both are mintignored, so an unreviewed frame cannot reach a public deploy.
- **Do not screenshot** reporting dashboards, the brands list, or anything mostly numeric. They carry client data and go stale fastest. A stale screenshot is worse than none because it still looks authoritative.

## Content boundaries

- **Do not publish pricing.** Pricing depends on scope and is set on the call by design. Do not infer, estimate, or reproduce numbers.
- **Do not invent metrics, results, or case studies.** No CAC figures, ROAS claims, or client names unless supplied and approved.
- **Do not document an SDK, CLI, or self-serve signup.** None exist; onboarding runs through a call.
- **The MCP connection is real and documented** at `/operator-wiki/resources/mcp`. It is operator-only — brand logins are refused — so never tell a client they can connect.
- Do not add integrations to the documented stack (Shopify, Meta, Google, TikTok, Slack, ClickUp) without confirmation.
- Verify claims against [usekommerce.com](https://usekommerce.com) before publishing. When a detail cannot be verified, leave it out rather than hedging in public copy.
