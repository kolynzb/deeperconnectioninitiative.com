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
| `dci-sand` (= `background`) | `#EFE5D0` | Page background (textured, set on `body`) |
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

| Role | Classes |
|---|---|
| Page title (`h1`) | `text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95]` |
| Section title (`h2`) | `text-4xl sm:text-5xl font-semibold tracking-tight leading-tight` |
| Card title (`h3`) | `text-xl` or `text-2xl font-semibold` |
| Lead paragraph | `text-base sm:text-lg leading-relaxed text-muted-foreground` |
| Body | `text-base` or `text-sm leading-relaxed` |
| Eyebrow / label | `text-xs font-semibold uppercase tracking-wide text-dci-teal` |

Nothing smaller than `text-xs` (12px). Use `text-balance` on headings, `text-pretty` on paragraphs.
Don't set `font-family` inline.

## Layout

- Build pages from the section kit in `$lib/components/sections`:
  - `PageHero` for the top of every inner page.
  - `Section` for every band after the hero.
  - `SectionHeading` for every section title.
  - `CtaBand` for the closing call to action.

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

Borders first. When something must float, use one of the four shadow tokens:
`shadow-dci-soft`, `shadow-dci-lift`, `shadow-dci-teal`, `shadow-dci-panel`. Never `shadow-lg`
or `shadow-[…]`.

## Components

- **Button:** `$lib/components/ui/button`. Brand CTA is a pill:
  `rounded-full bg-dci-teal px-6 text-sm font-semibold text-dci-cream hover:bg-dci-teal-mid`.
  One primary CTA per section; secondary actions are outline or text links.
- **Eyebrow:** `sections/eyebrow.svelte` (`tone="dark"` on dark bands).
- **Card:** `rounded-2xl border border-dci-teal/15 bg-dci-paper p-6 sm:p-8`, optional
  `dci-soft-hover`.
- **Form field:**
  `h-12 w-full rounded-2xl border border-dci-teal/15 bg-dci-paper px-4 text-base text-foreground placeholder:text-muted-foreground/60`
  and a visible teal focus ring.
- **Toolkit product card:**
  - Media and copy sit side by side, alternating sides per row.
  - Use `md:min-h-*`, never a fixed height; content must be able to grow.
  - The product's accent colour lives only in its Connection Miles™ badge
    (`border-dci-burgundy/25 bg-dci-burgundy/10 text-dci-burgundy`, or the teal equivalents).
  - The pill holds only the metric. The gloss ("8 lives impacted") sits beside it as plain text.
  - Prices stay `text-dci-teal-deep`.

## Motion

- House easing is `cubic-bezier(0.16, 1, 0.3, 1)`.
- Use `use:reveal` from `$lib/actions/reveal` for scroll entrances.
- `dci-soft-hover` is for hover lift and `dci-float-slow` for ambient decoration.
- Nothing loops forever.
- Every animation must stop under `prefers-reduced-motion` (the reduce block in `layout.css`).
