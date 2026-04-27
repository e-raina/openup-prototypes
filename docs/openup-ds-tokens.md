# OpenUp DS Token Reference

Source: [OpenUp End-User Design System](https://www.figma.com/design/vhK2oExQAIXi884D0ARZ8x/End-User-Design-System) Figma file. Implemented in [`src/index.css`](../src/index.css).

The DS uses a two-layer system:
- **Foundation primitives** — raw color ramps. Use only as escape hatches.
- **Theme aliases** — semantic tokens. Use these in components.

## Theme aliases (preferred)

| Token | Tailwind utility | Maps to | Use for |
|---|---|---|---|
| **Backgrounds** | | | |
| `BG/Lvl1` | `bg-bg-lvl1` | `orange/100` (#FFF8ED) | Page-level warm background |
| `BG/Lvl2` | `bg-bg-lvl2` | `orange/50` (#FFFDFB) | Slightly raised surface |
| `BG/Lvl3` | `bg-bg-lvl3` | white | Fully elevated surface (cards, inputs) |
| `BG/Inverted` | `bg-bg-inverted` | `indigo/950` (#070F31) | Dark surfaces |
| `BG/Success` | `bg-bg-success` | `green/700` (#187363) | Success states (DS spelling: "Succes") |
| `BG/Tag blur` | `bg-bg-tag-blur` | `orange/100 80%` | Translucent warm (chat bubbles) |
| `BG/Tag` | `bg-bg-tag` | `indigo/950` | Solid dark tag |
| `BG/Interactive` | `bg-bg-interactive` | `indigo/50` (#F2F3F7) | Subtle interactive surface |
| **Text** | | | |
| `Text/Primary` | `text-text-primary` | `indigo/800` (#152361) | Body, headings |
| `Text/Secondary` | `text-text-secondary` | `indigo/700` (#5B6590) | Muted, captions, placeholders |
| `Text/Inverted-primary` | `text-text-inverted-primary` | `orange/50` | Text on dark surfaces |
| `Text/Link` | `text-text-link` | `green/700` | Links |
| `Text/onDark` | `text-text-on-dark` | `orange/50` | Always-light text |
| **Icons** (same color values as Text) | | | |
| `Icon/Primary` | `text-icon-primary` | `indigo/800` | |
| `Icon/Secondary` | `text-icon-secondary` | `indigo/700` | |
| `Icon/Brand` | `text-icon-brand` | `green/700` | Brand-tinted icons |
| `Icon/Inverted-primary` | `text-icon-inverted-primary` | `orange/50` | |
| `Icon/onDark` | `text-icon-on-dark` | `orange/50` | |
| **Graphics** (decorative fills) | | | |
| `Graphic/Primary` | `bg-graphic-primary` | `green/500` (#00A885) | Brand accent fills, avatars |
| `Graphic/Disabled` | `bg-graphic-disabled` | `indigo/200` (#D0D3E1) | Disabled fills, skeleton pills |
| **Borders** | | | |
| `Border/Primary` | `border-border-primary` | `indigo/100` (#E6E8EF) | Default border |
| `Border/Hover` | `border-border-hover` | `indigo/300` (#B7BCD2) | Hover state |
| `Border/Active` | `border-border-active` | `green/500` | Focus / active state |
| **Buttons** | | | |
| `Button/Primary-default` | `bg-button-primary-default` | `green/700` | Primary button default |
| `Button/Primary-pressed` | `bg-button-primary-pressed` | `green/900` | Primary button pressed/hover |

## Foundation primitives

Use only when a Theme alias doesn't fit. Naming: `<color>-<shade>` (50–950).

| Family | Tailwind utility | Hex range |
|---|---|---|
| `grey-50` … `grey-950`, `grey-950-80` | `bg-grey-500` etc. | #F7F7F7 → #00110E |
| `green-50` … `green-950` | `bg-green-500` etc. | #EDF6F3 → #00382D |
| `orange-50` … `orange-950`, `orange-100-80` | `bg-orange-500` etc. | #FFFDFB → #5C3900 |
| `indigo-50` … `indigo-950` | `bg-indigo-500` etc. | #F2F3F7 → #070F31 |
| `destructive-50` … `destructive-950` | `bg-destructive-500` etc. | #FEF2F2 → #460809 |

## Escape hatch — `--color-loader-active-blue`

The `#0690F1` blue used by C-2's active step dot (1–3) and the gradient line top stop has **no DS alias yet**. Currently exposed as `var(--color-loader-active-blue)` in `src/index.css` and consumed via `bg-[var(--color-loader-active-blue)]`. Strong candidate for a new Theme alias like `Loader/Active` or `Accent/Info` if the pattern recurs.

## Backwards-compat aliases

The pre-DS prototype used Tailwind's `slate-*` names. These are preserved as aliases pointing to DS values so older components (Navbar, Avatar, etc.) don't break:

```css
--color-slate-200 → indigo/50
--color-slate-400 → indigo/300
--color-slate-700 → indigo/700
--color-slate-800 → indigo/900
--color-slate-900 → indigo/800
--color-slate-950 → indigo/800
```

Migrate components to the semantic Theme tokens above when you touch them. Once nothing uses `slate-*`, the aliases can be deleted.

## When to introduce a new token

If you find yourself reaching for a raw hex more than once across the codebase, propose a new alias:

1. Comment the raw use (`/* candidate: introduce Graphic/Ambient-warm */`)
2. Document the candidate in your experiment's `HANDOVER.md` under "Tokens"
3. Bring it to the DS team for an alias decision before it ships

## Typography

| Token | Tailwind utility | Value |
|---|---|---|
| `--font-sans` | `font-sans` | Montserrat |
| `--font-serif` | `font-serif` | Noto Serif JP |
| `--radius-pill` | `rounded-pill` | 999px |

## Source of truth

- DS Figma file: `vhK2oExQAIXi884D0ARZ8x` (End-User Design System)
- Storybook: https://storybook.openup-test.com
- Implementation: [`src/index.css`](../src/index.css)
