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

- `rounded-full` for buttons, pills, avatars and icon chips.
- `rounded-2xl` for cards, recessed card covers and form fields.
- `rounded-4xl` for large panels, heroes and bands.
- `.dci-pebble` / `.dci-pebble-alt` for organic asymmetric number badges and icon wells (`42% 58% 54% 46% / 48% 44% 56% 52%`).

Retire `rounded-xl`/`lg`/`3xl` when you touch a file.

## Depth

Borders and recessed surface shifts (`dci-sand` → `dci-paper` → `dci-cream`), not drop shadows.
The one shadow, `shadow-dci-overlay`, is only for things that float over the page: the header,
menus and drawers. Cards, photos and panels never get a drop shadow; multi-item decks may use
`.dci-card-collection` for physical stacked backing sheets.

## Components (DCI × Cojeev Architecture)

- **Button:** always `$lib/components/ui/button` (or `buttonVariants()` on a raw `<a>`).
  Never hand-roll a pill, and never pass colours, padding or radius through `class`
  (layout only: `w-full`, `mt-*`, `self-start`).
  - Variants: `default` (teal), `accent` (burgundy, one per view), `outline`,
    `inverse` / `inverse-outline` (on dark or burgundy), `link`.
  - Sizes: `default` (h-12) and `sm` (h-10). That's all.
  - One primary CTA per section; the rest are `outline` or text links.
- **Eyebrow:** `sections/eyebrow.svelte`. Plain text, no pill, no icon.
- **Card (`$lib/components/ui/card` and `sections/feature-card.svelte`):**
  Cojeev-inspired structured cards on `bg-dci-paper` with `border border-dci-teal/15`:
  - **`editorial` (default & `split`):** May include a recessed `CardCover` (`bg-dci-cream`,
    `bg-dci-mist`, `bg-dci-blush`, or `bg-dci-oat`), eyebrow + serif title + body, and a
    recessed split `CardFooter` bar (`bg-dci-cream/55 border-t border-dci-teal/12`) pairing
    status/meta text on the left with a pill CTA or link on the right.
  - **`project`:** Header with an organic `.dci-pebble` number badge (`01`, `02`, …), title,
    description, and hairline-divided `CardStepList` rows with check indicators.
  - **`collection`:** Uses `.dci-card-collection` to render two subtle fanned paper backing
    sheets behind the main card for multi-item decks or kits.
  - No watermark numerals behind cards: one number per card, in its pebble badge.
- **Form field (`$lib/components/ui/field`):**
  Three Cojeev control appearances:
  - `inset` (preferred for structured forms & drawers): recessed `bg-dci-cream/85` well
    wrapping both the uppercase eyebrow label and the input inside one `rounded-2xl` container.
  - `contour`: standalone `h-12 rounded-2xl border border-dci-teal/15 bg-dci-paper px-4`.
  - `editorial`: bottom-rule field with a sliding `dci-teal` focus bar (`.dci-field-editorial`).
- **Motion (`$lib/actions/flow`):** Cojeev's own engine (`$lib/cojeev-motion`, MIT), not a copy of its look.
  - `Button` already carries `use:morph` (organic surface) and `use:flowPress` (release pulse). Outline draws as a stroke; ghost and link stay flat.
  - `use:flowGroup` on a nav, tab strip or segmented control glides one pill to the item marked `aria-current="page"`, `aria-selected`, or `aria-pressed`, with a hover preview. Pass `{ itemSelector: 'a' }` for link lists.
  - Recolour a group with `--glide-bg`, `--glide-fg` and `--glide-hover-bg` on its element, never with classes on the pill.
- **Toolkit product card:**
  - Media and copy sit side by side, alternating sides per row; photos fill their frame.
  - Use `md:min-h-*`, never a fixed height; content must be able to grow.
  - Connection Miles is one plain line of text ("Earns 8 Connection Miles"), not a badge.
  - Prices are `font-serif text-3xl text-dci-teal-deep` paired in a split footer bar.

## Never

These are what make a site look generated. Don't add them back:
- dot-grid or noise textures, blurred colour blobs, glows, gradient fills on solid objects;
- pill badges on labels, sparkle or "live" pinging dots, generic icons in a square above every card;
- floating or looping decorative art, hover lifts (`hover:-translate-y-*`) on things you can't click;
- glassy floating name tags;
- three or more competing buttons in one block;
- spot or cartoon illustrations, dark "side panels" of stats next to a page title.

`npm run check` runs `scripts/check-design.js`, which fails on most of these. If you
need an exception (floating UI, the logo), add the file to its `allowed` list.

## Assets

- Photos are WebP in `static/photos`. Convert new ones (`cwebp -q 78`), and give
  above-the-fold photos a phone-sized copy via `srcset`.
- Fonts are self-hosted in `static/fonts` (Fraunces roman + italic, Outfit) and declared
  in `layout.css`. Fraunces is trimmed to weight 400 (the only one used), which halves
  its size. Don't add a Google Fonts link back.
- `vercel.json` caches fonts for a year and photos for a day. To change a font, give
  the file a new name, or returning visitors keep the old one.

## Motion

- House easing is `cubic-bezier(0.16, 1, 0.3, 1)`; spring easing is `cubic-bezier(0.22, 1, 0.36, 1)`.
- Use `use:reveal` from `$lib/actions/reveal` for scroll entrances, and `use:flowGroup` from
  `$lib/actions/flow` for travelling selection pills.
- `dci-soft-hover` only darkens a border on hover; nothing lifts or floats.
- Nothing loops forever.
- Every animation must stop under `prefers-reduced-motion` (the reduce block in `layout.css`).
