# DCI design system

The rules every page and component follows. Tokens live in `src/routes/layout.css`.
If something you need is not here, add it here and to `layout.css` first; never invent
a one-off value in markup.

## Personality

Warm, grounded, honest. Cream and sand grounds, deep teal for depth, burgundy as a
rare spotlight. A well-made physical object, never clinical. Light mode only.

## Colour

Only these names exist. Never Tailwind's `slate`/`gray`/`stone`/`zinc`, never hex in markup.

| Token | Hex | Use |
|---|---|---|
| `dci-sand` (= `background`) | `#EFE5D0` | Page background (flat, set on `body`) |
| `dci-cream` | `#F6ECD9` | Warm panels; text on dark surfaces |
| `dci-paper` | `#FFF9EA` | Cards, form fields |
| `dci-teal-deep` | `#1A3C40` | Dark panels and bands, prices, logo |
| `dci-teal-mid` | `#234F53` | Hover on teal-deep surfaces |
| `dci-teal` (= `primary`) | `#2A6268` | Buttons, links, eyebrows, tinted borders |
| `dci-burgundy` (= `accent`) | `#6F231E` | One spotlight per view: a highlight word, a badge, an alert |
| `dci-ink` (= `foreground`) | `#171817` | Headings and primary text |
| `muted-foreground` | `#57534E` | Body and secondary text |
| `dci-clay`, `dci-blush`, `dci-mist`, `dci-oat` | | Toolkit product media tints only |

Text colour on light: headings `text-foreground`, body `text-muted-foreground`.
On dark (`bg-dci-teal-deep`, `bg-dci-ink`): `text-dci-cream`, secondary `text-dci-cream/75`
(never lower; it fails contrast). Borders: `border-border` or `border-dci-teal/15`–`/25`.
Tints use opacity suffixes: `bg-dci-teal/5`, `bg-dci-burgundy/10`.

## Type

Fraunces (serif) for `h1`–`h6`, applied automatically. Outfit (sans) for everything else.

Editorial direction (chosen 2026-10, modelled on wisprflow.ai): headings are large and
**regular weight** (`font-normal`), never bold. Size carries the hierarchy. A heading may
put one phrase in italics as its accent, `<em class="text-dci-burgundy">` on light and
`<em class="text-dci-clay">` on dark. Use at most one per heading and no underlines or
highlights besides it. The whole homepage follows this; inner pages are
still being moved over.

Use the type utilities from `layout.css`. Never hand-write heading sizes.

| Role | Utility |
|---|---|
| Homepage headline (`h1`) | `type-display` |
| Section title (`h2`), inner page title | `type-headline` (inner page `h1` adds `lg:text-7xl`, via `PageHero`) |
| Large card title (`h3`) | `type-title` |
| Small card title | `type-subtitle` |
| Lead paragraph | `type-lede` + a colour |
| Eyebrow / label | `type-eyebrow` + a colour (`text-dci-teal`, `text-dci-cream/75` on dark) |
| Body | `text-base` or `text-sm leading-relaxed` |

Nothing smaller than `text-xs` (12px). Use `text-balance` on headings, `text-pretty` on paragraphs.
Don't set `font-family` inline.

## Layout

- Build pages from the section kit in `$lib/components/sections`:
  - `PageHero` for the top of every inner page.
  - `Section` for every band after the hero.
  - `SectionHeading` for every section title (`split` puts the intro beside it; pass
    `title` as a snippet to italicise one phrase with `<em>`).
  - `CtaBand` for the closing call to action (burgundy; use `inverse` buttons).

  Don't hand-roll `<section class="px-4 ... max-w-7xl">`.
- Page frame is `max-w-7xl` with `px-4 sm:px-6 lg:px-8`. Section rhythm is `py-16 lg:py-24`.
- Heading area to content: `mt-10` / `mt-12`. Spacing flows downward (`mt-*`, `space-y-*`).
- One job per section. A page is a short, flat list of sections; if two sections both ask
  the visitor to "pick a path", merge them.

## Radius

Three values only:
- `rounded-full` for buttons, pills, avatars and icon chips.
- `rounded-2xl` for cards and form fields.
- `rounded-4xl` for large panels, heroes and bands.

Retire `rounded-xl`/`lg`/`3xl` when you touch a file.

## Depth

Borders, not shadows. The one shadow, `shadow-dci-overlay`, is only for things that float
over the page: the header, menus and drawers. Cards, photos and panels never get one.

## Components

- **Button:** always `$lib/components/ui/button` (or `buttonVariants()` on a raw `<a>`).
  Never hand-roll a pill, and never pass colours, padding or radius through `class`
  (layout only: `w-full`, `mt-*`, `self-start`).
  - Variants: `default` (teal), `accent` (burgundy, one per view), `outline`,
    `inverse` / `inverse-outline` (on dark or burgundy), `link`.
  - Sizes: `default` (h-12) and `sm` (h-10). That's all.
  - One primary CTA per section; the rest are `outline` or text links.
- **Eyebrow:** `sections/eyebrow.svelte`. Plain text, no pill, no icon.
- **Card:** `rounded-2xl border border-dci-teal/15 bg-dci-paper p-6 sm:p-8`. No shadow unless
  it floats over something. Cards that aren't links don't react to hover.
- **Form field:**
  `h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground placeholder:text-muted-foreground`
  and a visible teal focus ring.
- **Toolkit product card:**
  - Media and copy sit side by side, alternating sides per row; photos fill their frame.
  - Use `md:min-h-*`, never a fixed height; content must be able to grow.
  - Connection Miles is one plain line of text ("Earns 8 Connection Miles"), not a badge.
  - Prices are `font-serif text-3xl text-dci-teal-deep`.

## Never

These are what make a site look generated. Don't add them back:
- dot-grid or noise textures, blurred colour blobs, glows, gradient fills on solid objects;
- pill badges on labels, sparkle or "live" pinging dots, icons in a tinted square above every card;
- floating or looping decorative art, hover lifts on things you can't click;
- offset "backing" panels behind photos, glassy floating name tags;
- three or more competing buttons in one block;
- spot or cartoon illustrations, dark "side panels" of stats next to a page title.

`npm run check` runs `scripts/check-design.js`, which fails on most of these. If you
need an exception (floating UI, the logo), add the file to its `allowed` list.

## Assets

- Photos are WebP in `static/photos`. Convert new ones (`cwebp -q 78`), and give
  above-the-fold photos a phone-sized copy via `srcset`.
- Fonts are self-hosted in `static/fonts` (Fraunces roman + italic, Outfit) and declared
  in `layout.css`. Don't add a Google Fonts link back.

## Motion

- House easing is `cubic-bezier(0.16, 1, 0.3, 1)`.
- Use `use:reveal` from `$lib/actions/reveal` for scroll entrances.
- `dci-soft-hover` only darkens a border on hover; nothing lifts or floats.
- Nothing loops forever.
- Every animation must stop under `prefers-reduced-motion` (the reduce block in `layout.css`).
