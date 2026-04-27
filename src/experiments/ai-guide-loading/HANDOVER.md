# AI Guide — Loading UI

> Status: Handover ready | Owner: Hannah | Last updated: 2026-04-27

**Live:** https://openup-speedlab.netlify.app/ai-guide-loading
**Figma:** https://www.figma.com/design/A6wya1hopV9eNlHunRRjYs/-Exploration--OpenUp-AI-Companion
**Source:** [`src/experiments/ai-guide-loading/`](.)

## TL;DR

Two design directions for masking AI Guide's high response latency (>5s, sometimes 11s+). Variant **C-2** shows a 4-step timed cadence with a hidden future. Variant **D** is an ambient companion with rippling rings and rotating captions, no progress indicator. Both run on a fixed timer independent of the model — they exit gracefully with a 200ms fade when the response actually arrives, regardless of which step or phase is active. Goal: reduce perceived wait time and give users a sense of presence during generation.

## Context & problem

AI Guide is currently struggling with high latency per output (>5s, with some responses taking up to 11s of generation). This makes the experience feel laggy and risks high drop-off at launch.

This workstream is the **design-side** response. The technical workstream (reducing actual latency) runs in parallel.

## Design proposal

| Variant | Hypothesis |
|---|---|
| **C-2** Step cadence with hidden future | Users feel progress without the over-engineered determinism of a full checklist. Hiding upcoming steps keeps it from feeling like a system spec. |
| **D** Ambient companion | Removes "how long until done" entirely. Trades perceived progress for emotional presence — bet is that a mental-health context rewards presence more than productivity cues. |

## Behavior spec

### Variant C-2 — Step cadence with hidden future

Four sequential steps progressing on a fixed 2s timer. Only the completed and active steps show copy; future steps render as grey skeleton pills. Step 4 is visually distinct (hollow ring while pending, breathing green dot when active) so users see the endpoint before they reach it.

| Step | Active at | Copy |
|---|---|---|
| 1 | t=0 | "Listening to you" |
| 2 | t=2000ms | "Thinking this through" |
| 3 | t=4000ms | "Finding the right words" |
| 4 | t=6000ms (holds) | "Almost with you" |

A vertical gradient line (blue → green → dark green) fills 0% → 33% → 66% → 100% as steps advance, with a 1800ms ease so growth feels continuous between discrete steps.

### Variant D — Ambient companion

A centered green avatar with three concentric rippling rings and inward-drifting sparks. A single caption rotates through 4 empathetic phrases on a fixed cadence.

| Phase | Active at | Caption |
|---|---|---|
| p1 | t=0 | "Taking this in" |
| p2 | t=2750ms | "This is allowed to be hard" |
| p3 | t=5500ms | "Feelings don't always make sense" |
| p4 | t=8250ms (holds) | "Hard days happen" |

Caption swap: ~520ms cubic-bezier fade with a slight y-offset. Ring ripple: 3.6s loop, three concentric rings staggered -1.2s / -2.4s. Sparks: 2.8s loop with staggered delays.

### Shared — exit transition

Both variants share the same exit:

1. **Settle / fade-out** — 200ms opacity fade on the entire loader block
2. **Response fade-in** — 200ms opacity fade-in on the response text

Total transition window: ~200ms. Soft, never hard cut.

## Edge cases

The current default fixture renders the loader for a flat 11s before the response arrives. The component supports passing `responseArrivedAt={ms}` to override this — for production, this is wired to the real "response arrived" signal from the model.

### Response arrives early (e.g., t=3s)

- Loader exits immediately when the response arrives — does **not** wait for remaining steps to complete.
- Step transitions that would have fired after the exit are simply never scheduled — no flicker.
- For Variant D: caption transitions past the response time are dropped.

### Response arrives late (>11s)

- **Variant C-2:** Step 4 keeps holding — its breathing-halo animation provides the natural "looping" visual. No further progression, no fake captions.
- **Variant D:** p4 caption ("Hard days happen") stays on screen. Avatar ripples and sparks continue their loop animation indefinitely.
- When the response actually arrives (whenever that is), the same 200ms fade-out → fade-in transition fires.
- Open question: do we need an upper-bound escalation state ("still here", "this is taking a while", graceful timeout)? See questions below.

## Component API

```tsx
// Variant C-2
<VariantC2_StepCadence
  sent={boolean}                       // user has submitted message
  responseArrivedAt={number | undefined}  // ms after sent (defaults to TOTAL_DURATION_MS)
  freeze={string | null | undefined}      // dev-only: '0'..'3' | 'final'
/>

// Variant D
<VariantM_MemoryRipple
  sent={boolean}
  responseArrivedAt={number | undefined}
  freeze={string | null | undefined}      // dev-only: '0'..'3' | 'settle' | 'final'
/>
```

In production, `responseArrivedAt` is the elapsed time (ms) at which the response arrives. The variant uses it to schedule the exit fade. If you have a streaming token signal, pass time-to-first-token as `responseArrivedAt` so the loader exits the moment tokens start flowing.

## URL params (for testing)

| Param | Values | Purpose |
|---|---|---|
| `?v=` | `A`, `B`, `C`, `C2`, `D`, `E` | Switch variant in the speedlab toggle |
| `?freeze=` | `0`, `1`, `2`, `3`, `final` | Freeze the variant at a specific step/phase. Skips the timer entirely. Used for static screenshots. |
| `?response=` | milliseconds (e.g., `3000`, `20000`) | Override when the response arrives. Test early/late edge cases. |

Try:
- https://openup-speedlab.netlify.app/ai-guide-loading?v=C2 — C-2 normal flow
- https://openup-speedlab.netlify.app/ai-guide-loading?v=C2&freeze=2 — frozen at step 3
- https://openup-speedlab.netlify.app/ai-guide-loading?v=C2&response=3000 — early arrival
- https://openup-speedlab.netlify.app/ai-guide-loading?v=D&response=20000 — D late arrival

## Tokens

The prototype is bound to OpenUp End-User Design System tokens via `src/index.css`. Engineers should reference the same Theme aliases when implementing in production.

| Use | DS token | Notes |
|---|---|---|
| Page background | `BG/Lvl1` (orange/100) | |
| User message bubble | `BG/Tag blur` (orange/100 80%) | |
| Input / card surface | `BG/Lvl3` (white) | |
| Body text | `Text/Primary` (indigo/800) | |
| Muted / done step text | `Text/Secondary` (indigo/700) | |
| Skeleton pills, divider | `Border/Primary` / `Graphic/Disabled` | |
| Hollow ring stroke | `Border/Hover` (indigo/300) | |
| Done check, brand accent, D avatar/ripples | `Graphic/Primary` (green/500) | |
| Send button | `Button/Primary-default/pressed` | |
| Active border / focus | `Border/Active` (green/500) | |
| **C-2 active step 1–3 dot + gradient top stop** | (no DS alias yet — `#0690F1`) | Proposal: introduce `Loader/Active` or `Accent/Info` |
| **Ambience warm amber** (`#FDBF87`) | (no DS alias) | Proposal: `Graphic/Ambient-warm` |
| **Ambience honey accent** (`#FDDB87`) | (no DS alias) | Proposal: `Graphic/Ambient-honey` |
| **Ambience green tint** | derived from `Graphic/Primary` (rgba 0.3) | |

See [`docs/openup-ds-tokens.md`](../../../docs/openup-ds-tokens.md) for the full token reference.

## Background ambience

A soft layered radial gradient sits behind the composer in both variants, fixed to the viewport. Three layers:

1. **Warm amber** glow — main, ellipse 60% × 45% at 50%, 94% from top, 65% center opacity
2. **Green tint** — left of composer, ellipse 42% × 32% at 28%, 90%, 30% center opacity
3. **Honey accent** — right of composer, ellipse 38% × 28% at 72%, 92%, 40% center opacity

All three pulse opacity (0.55 ↔ 1.0) on independent timings: 4.4s for amber, 5.8s for green, 4.4s for honey with -1.4s offset. The desync is deliberate — combined cycle doesn't realign for ~21 minutes, which is what makes the gradient feel ambient rather than mechanical.

Reduced-motion fallback: hold each layer at midpoint (~0.78 opacity), no animation.

Implementation: [`AmbientOverlay.tsx`](./AmbientOverlay.tsx). Animations defined in `src/index.css` (`speedlab-ambient-pulse`, `.speedlab-ambient-warm`, `.speedlab-ambient-green`).

## Open questions for engineering

Front-loaded decisions that block design. Please respond before we lock direction.

1. **What's the actual latency distribution?** We're designing around an 11s ceiling but need p50/p75/p95 for real prompts to know if the step cadence is tuned correctly. If p50 is closer to 3s, the 4-step C-2 is over-engineered.

2. **Is there a streaming signal for "first token received"?** Both variants currently treat the response as a single arrival event. If we can stream, we should exit the loader the moment tokens start flowing — much bigger perceived-latency win than any animation choice.

3. **What happens on timeout / error?** The prototype assumes a happy path. Need to know what state the loader should fall back to if the model errors or exceeds threshold. Related: should there be an upper-bound late-arrival escalation ("still here", "this is taking a while")?

Nice to know:
- Can we log TTFT (time to first token), total generation time, and drop-off during loading?
- Mobile platform constraints (iOS / Android) — anything that rules out a variant?
- If streaming, does partial output render cleanly or do we need to buffer until sentence boundaries?

## Out of scope

- **Sound design** — both variants would benefit from subtle audio (soft tone, breath) but no audio is wired in the prototype. Decision: scope for v1 or later?
- **Haptics on mobile** — the breath rhythm of D's avatar begs for haptic reinforcement; not yet wired.
- **Error / fallback states** — see open question 3.
- **Variants A, B, E** in the speedlab toggle — earlier explorations kept around for comparison, not active proposals.

## Changelog

- 2026-04-27 — Refactored to use OpenUp DS tokens; restructured into `experiments/` folder
- 2026-04-25 — Added `responseArrivedAt` prop + edge case behavior (early/late arrival)
- 2026-04-23 — Initial C-2 + D variants built; deployed to Netlify
