# DCI website

SvelteKit (Svelte 5 runes) + Tailwind v4, deployed on Vercel.

Before changing any UI, read `.interface-design/system.md` and follow it. It is the design system:
- the only colours, type sizes, radii and shadows allowed;
- the section kit to build pages from.

Other rules:
- Page titles and descriptions live in `src/lib/config/seo.ts`. Don't add `<svelte:head>` titles in pages.
- Clinic dates come from `src/lib/clinics.ts`. Never hardcode a date.
- Run `npm run check` (types and the design rules) and `npm run build` before committing.
