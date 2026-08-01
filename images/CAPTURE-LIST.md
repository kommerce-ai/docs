# Screenshot capture list

Not published — this file is in `.mintignore`.

## Before you capture anything

Both wikis are **public with no authentication**. Anything visible in a screenshot is
on the open internet, and brands can read the agency wiki.

**Capture from a demo brand with fabricated data. Never from a live client account.**

There is no seed fixture in the product repo yet, so this means creating a throwaway
brand by hand: invented brand name, invented products, invented spend. Blurring a real
account afterwards is not an acceptable substitute — it gets forgotten exactly once.

Check every frame for:

- Brand or company names belonging to real clients
- Spend, revenue, ROAS, CPA — any figure
- Meta ad account IDs, Business Manager IDs, pixel IDs
- Email addresses, member names, avatars
- Browser chrome: tabs, bookmarks, autofill dropdowns, notification banners

## Where files go

Organised by **subject**, not by wiki, because most of this UI is identical for
agency and brand users and the same file serves both pages.

```
images/onboarding/     Meta connection flow
images/creative/       Both studios
images/media-buying/   Campaign wizard
images/meta-audit/     Audit scorecard
```

If a surface is genuinely agency-only (the portfolio view, the brands list), put it in
`images/agency-only/` — and think hard about whether it should exist at all, given
those screens are the ones that carry client figures.

## The list

Nine shots, in priority order. Each already has a commented-out `<Frame>` block in the
page(s) that use it — drop the PNG at the path, delete the comment markers, done.

### 1. Meta connection — highest value

The documented number-one stall point, and it spans two products. Prose is weakest
exactly where someone is hunting for a button in *Meta's* interface.

| File | Shot | Used by |
| --- | --- | --- |
| `onboarding/connect-meta-agency-id.png` | The Kommerce panel showing the agency ID with its copy button | brands · connect-meta |
| `onboarding/connect-meta-partner-access.png` | Meta Business Manager's partner-access screen, mid-flow | brands · connect-meta, agency · meta-access |
| `onboarding/connect-meta-success.png` | The "Connected — your ad account is linked" state | brands · connect-meta |

For the Meta-side shot, use a throwaway Business Manager. Redact the real agency ID
even from a demo capture — it is the one value a stranger could act on.

### 2. Creative — image studio

| File | Shot | Used by |
| --- | --- | --- |
| `creative/image-brief-step.png` | Brief step with product, persona, and awareness visible | both · image-generation |
| `creative/image-blueprints-grid.png` | The Select Visual Blueprints grid | both · image-generation |

The blueprints grid is the most inherently visual thing in the whole wiki — a
paragraph genuinely cannot convey it.

### 3. Creative — video studio

| File | Shot | Used by |
| --- | --- | --- |
| `creative/video-step-rail.png` | The five-step rail: Brief · Style · Cast · Script · Post-production | both · video-generation |

One shot of the step chrome explains the entire flow.

### 4. Media buying

| File | Shot | Used by |
| --- | --- | --- |
| `media-buying/campaign-step-rail.png` | The campaign wizard's step rail | both · media-buying |
| `media-buying/campaign-paused-confirmation.png` | The confirmation showing the campaign arrived **paused** | both · media-buying |

The paused state is the reassurance that publishing is not spending. Worth showing
rather than only asserting.

### 5. Meta audit

| File | Shot | Used by |
| --- | --- | --- |
| `meta-audit/dimension-scorecard.png` | The four dimensions with their grades and receipts | agency · meta-audit |

Four dimensions — Signal, Structure, Waste, Creative — graded **Green**, **Yellow**,
**Red**, or **Blind**, each with a one-line numeric receipt.

Use a demo brand with a deliberately mixed result — an all-green scorecard teaches
nothing about how to read it. A frame that includes a **Blind** grade is more useful
than one without, since Blind is the state people misread as an error.

The receipts contain spend figures, so this is the one shot on the list where demo data
is not optional.

## Do not capture

Reporting dashboards, the brands list, the portfolio view, or anything else whose
content is mostly numbers. Two reasons: they carry client figures, and they go stale
faster than anything else in the product. A stale screenshot is worse than no
screenshot, because it looks authoritative.

## Conventions

- **Root-relative paths only.** `/images/creative/foo.png`. Relative paths like
  `./foo.png` are not supported by Mintlify.
- **Always wrap in `<Frame>`** with a `caption`. The caption should say what to notice,
  not restate the filename.
- **Always write real `alt` text.** Describe what is on screen for someone who cannot
  see it — this is the accessibility surface, not a keyword slot.
- **20 MB hard ceiling** per file. Nothing here should come close; if a PNG is over
  ~500 KB, export it again at a sane width.
- **Capture at a consistent viewport.** Pick one width and stay with it, or the wiki
  looks assembled from different products.
- **Click-to-zoom is on by default.** Add `noZoom` only if a shot is already legible at
  full width.

## Light and dark

The site follows the reader's theme, so a light-mode capture looks wrong in dark mode.
Two options:

1. **Capture pairs** — `foo-light.png` and `foo-dark.png`, then:

   ```mdx
   <Frame caption="…">
     <img className="block dark:hidden" src="/images/creative/foo-light.png" alt="…" />
     <img className="hidden dark:block" src="/images/creative/foo-dark.png" alt="…" />
   </Frame>
   ```

2. **Drop the toggle** — set `appearance.strict` in `docs.json` and commit to one theme.

Pairs double both capture and maintenance cost. Only worth it if the product itself
has both themes; otherwise pick option 2 and match the product.
