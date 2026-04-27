# AI Guide — Loading states

> Status: Handover ready | Owner: Hannah | Last updated: 2026-04-27

**Live:** https://openup-speedlab.netlify.app/ai-guide-loading
**Figma:** https://www.figma.com/design/A6wya1hopV9eNlHunRRjYs/-Exploration--OpenUp-AI-Companion?node-id=5189-42810
**Source:** [`src/experiments/ai-guide-loading/`](.)

## TL;DR

UX shown while the AI Guide is generating a response. Two variants — **C-2 (Step cadence)** and **D (Rotating "warmth" copy)** — that **rotate per AI turn**, not picked between. Both run on a fixed timer independent of the model and exit gracefully with a 200ms fade when the response actually arrives.

> ⚠️ **Scope priority:** if engineering scope is too tight to ship both variants, **Variant C-2 is the priority** — ship that first, add D in a follow-up.

## Context & problem

**What this is:** the UX shown when the bot is generating a response.

**Why:** AI Guide currently has high latency per output (>5s, some responses up to 11s of generation). The experience feels laggy and risks drop-off at launch. This workstream explores design patterns that reduce perceived wait time and increase user sense of presence while the model generates.

## Design proposal

| Variant | Hypothesis |
|---|---|
| **C-2 — Step cadence** | Users feel progress without the over-engineered determinism of a full checklist. Hiding upcoming steps keeps it from feeling like a system spec. |
| **D — Rotating "warmth" copy** | Removes "how long until done" entirely. Trades perceived progress for emotional presence — bet is that a mental-health context rewards presence more than productivity cues. |

**Both variants ship.** The user sees them alternated across consecutive AI turns (e.g., turn 1 → C-2, turn 2 → D, turn 3 → C-2, …).

## Behavior spec

### Timing principle

**Total loading duration should align with average response latency.** This spec assumes latency = **11s** (current observed). Every timing value below — step cadence, caption rotation, when each phase holds — is tuned against that assumption.

When latency improves, retune in this order:
1. Update `TOTAL_DURATION_MS` in [`fixtures.ts`](./fixtures.ts) (currently `11_000`).
2. C-2: keep step interval at 2000ms; the holding step (Step 4) absorbs the slack. If latency drops below ~6s, drop a step rather than compressing intervals.
3. D: keep caption interval at 2000ms; p4 absorbs slack the same way. If latency drops below ~6s, drop a caption.
4. Soft exit fade (200ms) does NOT scale — keep it constant.

### Variant C-2 — Step cadence

Four sequential steps progressing on a fixed 2s timer. Only the completed and active steps show copy; future steps render as grey skeleton pills. Step 4 is visually distinct (hollow ring while pending, breathing green dot when active) so users see the endpoint before they reach it.

| Step | Active at | Copy |
|---|---|---|
| 1 | t=0 | "Listening to you" |
| 2 | t=2000ms | "Thinking this through" |
| 3 | t=4000ms | "Finding the right words" |
| 4 | t=6000ms (holds) | "Almost with you" |
| Final | response arrives | (loader fades out, response fades in) |

A vertical gradient line (blue → green → dark green) fills 0% → 33% → 66% → 100% as steps advance, with a 1800ms ease so growth feels continuous between discrete steps.

### Variant D — Rotating "warmth" copy

A centered green avatar with three concentric rippling rings (staggered 1.2s delays) and five sparks that travel inward into the avatar center. A single caption rotates through four empathetic phrases on a fixed 2s cadence. Loops on the last caption until response arrives.

| Phase | Active at | Caption |
|---|---|---|
| p1 | t=0 | "Taking this in" |
| p2 | t=2000ms | "This is allowed to be hard" |
| p3 | t=4000ms | "Feelings don't always make sense" |
| p4 | t=6000ms (holds) | "Hard days happen" |
| Settle | 200ms before response | (fade out) |
| Final | response arrives | (response fades in) |

**Caption swap transition:** 200ms ease-out (opacity + slight y-offset).

> Note: Figma spec says "rotate between 5 loading copy" but only lists 4. Proceeding with 4 — flag if a 5th copy is intended (TBD copy).

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
- Soft 200ms fade out → 200ms fade in.

### Response arrives late (>8s for D, >11s for C-2)

- **Variant C-2:** Step 4 keeps holding — its breathing-halo animation provides the natural "looping" visual. No further progression, no fake captions.
- **Variant D:** p4 caption ("Hard days happen") stays on screen. Avatar ripples and sparks continue their loop animation indefinitely.
- When the response actually arrives (whenever that is), the same 200ms fade-out → fade-in transition fires.

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
| `?freeze=` | `0`, `1`, `2`, `3`, `final` | Freeze the variant at a specific step/phase. Skips the timer entirely. |
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

## Background ambience (shared)

A soft layered radial gradient sits behind the composer in both variants, fixed to the viewport. Three layers:

1. **Warm amber** — main glow, ellipse 60% × 45% at 50%, 94% from top, 65% center opacity
2. **Green tint** — left of composer, ellipse 42% × 32% at 28%, 90%, 30% center opacity
3. **Honey accent** — right of composer, ellipse 38% × 28% at 72%, 92%, 40% center opacity

All three pulse opacity (0.55 ↔ 1.0) on independent timings: 4.4s for amber, 5.8s for green, 4.4s for honey with -1.4s offset. The desync is deliberate — combined cycle doesn't realign for ~21 minutes, which is what makes the gradient feel ambient rather than mechanical.

Reduced-motion fallback: hold each layer at midpoint (~0.78 opacity), no animation.

Implementation: [`AmbientOverlay.tsx`](./AmbientOverlay.tsx). Animations defined in `src/index.css` (`speedlab-ambient-pulse`, `.speedlab-ambient-warm`, `.speedlab-ambient-green`).
