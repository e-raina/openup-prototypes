# OpenUp Chat — Perceived-Speed Variants

**Date:** 2026-04-21
**Project:** `/Users/raihanah/openup-ai-guide`
**Status:** Design — awaiting implementation plan

## Goal

Build five chat-loading variants for the OpenUp AI Companion chat and let a human subjectively compare which *feels* fastest. All variants share the same total loading duration (11s) and resolve to the same final response — the only variable is the experience of waiting.

## Non-goals

- No real LLM, no backend. Prompt and response are hardcoded.
- No analytics, event tracking, or automated "winner" picking. This is a human-comparison tool.
- No mobile layout pass. Desktop only, matching the Figma frame (1440 wide).
- No integration with the existing `ChatContent` / `ChatDisclaimerPage` routes. This is a parallel surface.

## Scenario (held constant across all variants)

- **User prompt:** "I'm not sleeping well and I feel anxious"
- **Final response:** "It makes sense that anxiety and sleep are tangled up — they tend to feed each other. Before we dig into what's keeping your mind busy at night, can I ask: is this something new, or has it been building for a while?"
- **Total duration:** 11,000 ms from send → final message fully rendered
- **UI chrome:** matches Figma node `4888:119341` — top nav, user-message bubble, response area, topic pills, composer

## The five variants

Each variant is defined by what happens between t=0 (send click) and t=11,000 ms (final message fully visible).

### A — Control: "Thinking…"

- t=0 → t=10,700 ms: static 32px avatar-style animation + static `"Thinking..."` label in blue
- t=10,700 → t=11,000 ms: final message appears as one block

**Hypothesis:** Single static indicator with no continuous change produces the worst perceived wait. Baseline for the other four to beat. The article's v3 pattern ("wait feels never ending").

### B — Reframed status ladder

- t=0 → t=3,667 ms: "Hearing you…"
- t=3,667 → t=7,333 ms: "Sitting with this…"
- t=7,333 → t=10,700 ms: "Finding the right words…" (third label is slightly shorter so the indicator clears before the final message lands)
- t=10,700 → t=11,000 ms: indicator cleared, 300 ms settle, then final message appears as one block

**Hypothesis:** Lever #4 (reframe time) + lever #2 (continuous change). Companion-voiced, sequential labels convert dead time into named, meaningful work. In a mental-health context the *language* of the wait also does emotional work — it telegraphs presence, not computation.

### C — Pure streaming

- t=0 → t=1,000 ms: no indicator (brief true pause — natural)
- t=1,000 → t=11,000 ms: final message streams token-by-token (10s stream; ~45 tokens ≈ 220 ms/token)
- No avatar animation, no label. The response itself is the loader.

**Hypothesis:** Lever #2 (continuous change from the start) is the dominant perceived-speed driver. Reading while the system writes collapses wait into engagement. Risk: half-formed sentences in a vulnerable-topic context may feel unsettling. Worth testing precisely because it's the bluntest instrument.

### D — Early acknowledgment, then full reflection

- t=0 → t=1,200 ms: static "Thinking…" label
- t=1,200 ms: short acknowledgment appears instantly as its own message bubble — "That sounds really heavy."
- t=1,200 → t=10,700 ms: subtle typing indicator (three-dot pulse) under the acknowledgment
- t=10,700 → t=11,000 ms: full reflection appears as a second bubble below the acknowledgment

**Hypothesis:** Lever #3 (reveal before done). An instant emotional mirror within the first 1.2s — delivered with the full weight of a real message bubble, not a status label — reduces wait anxiety in a way no spinner can. The user has already felt heard by 1.2s, so the remaining 9.8s is patient rereading, not anxious waiting. Particularly suited to vulnerable openings.

### E — Breathing companion + morphing caption

- t=0 → t=10,700 ms: avatar animates with a slow 3s-per-cycle pulse/breath (scale 1.0 → 1.06 → 1.0, opacity stable, ease-in-out — organic, not a spinner). Caption beside it transitions through: `"Hearing you"` → `"Reflecting"` → `"Here"`. Transitions at t=3,667 ms and t=7,333 ms are typewriter-style: old caption deletes one character at a time over ~400 ms, then new caption types in one character at a time over ~400 ms. (Chose typewriter over crossfade to maximize continuous motion — lever #2.)
- t=10,700 → t=11,000 ms: final message appears as one block

**Hypothesis:** Lever #6 (tiny cues) + presence. "Thinking" reads as machine latency; a breathing companion reads as *someone sitting with you*. Variant E isolates the question: does subtle organic motion on the companion itself do perceived-speed work that label changes alone cannot?

## Architecture

### Route

Add to `src/App.tsx`:
```
if (path === "/chat-speed-lab") return <ChatSpeedLab />;
```

Variant selection via query param: `?v=A` (default `A`). Page also exposes an in-UI switcher.

### File layout

```
src/pages/ChatSpeedLab.tsx             — page: switcher, stopwatch, reset, shell
src/components/speedlab/
  ChatShell.tsx                        — shared chrome (header + user bubble + pills + composer)
  VariantA_Thinking.tsx
  VariantB_StatusLadder.tsx
  VariantC_Streaming.tsx
  VariantD_AckThenFull.tsx
  VariantE_BreathingAvatar.tsx
  DotTypingIndicator.tsx               — shared three-dot pulse (used in D)
  LoaderAvatar.tsx                     — shared 32px avatar container (animated in E, static elsewhere)
  useTimeline.ts                       — shared timing primitive
  fixtures.ts                          — userPrompt, finalResponse, ackSnippet constants
```

### Timing primitive: `useTimeline`

A single hook centralizes the 11,000 ms budget so all variants are provably synchronized:

```ts
type Phase = { at: number; id: string };
function useTimeline(phases: Phase[], running: boolean): string;
```

- Given an ordered list of phases with absolute ms timestamps, returns the current phase id based on elapsed time.
- Each variant declares its own phases; the timeline hook is the only place `setTimeout` lives.
- When `running` transitions false → true, timeline resets to t=0.
- On unmount or `running → false`, all scheduled timeouts clear.

Example for Variant B:
```ts
useTimeline([
  { at: 0,     id: "hearing" },
  { at: 3667,  id: "sitting" },
  { at: 7333,  id: "finding" },
  { at: 10700, id: "pre-final" },
  { at: 11000, id: "final" },
], isLoading);
```

### Stopwatch

- Rendered in the page header area of `ChatSpeedLab`.
- Shows live `mm:ss.ms` while loading, freezes at final-message timestamp.
- Purpose: honesty check — user can confirm all variants land within ±50 ms of 11,000 ms.

### Reset flow

- "Send" button (or pressing Enter in composer) kicks off the active variant's timeline. Composer is pre-filled with the fixed user prompt so the user just hits send.
- "Reset" button returns to empty state (no user bubble, no response, composer pre-filled).
- Switching variant via switcher auto-resets.

### ChatShell responsibilities

- Renders top nav exactly matching Figma node `4888:119341` (Home / Explore / Sessions / AI Guide [Beta] + search + My progress + CD avatar).
- Renders user bubble once send has fired (same position and style across all variants).
- Renders topic pills row and composer at bottom (chrome; non-interactive for this lab).
- Takes the active variant's response slot as children, positioned where the Figma loader sits.

### Styling

- Reuse existing tokens in `src/index.css` (`green-500`, `orange-50`, `slate-*`, `font-sans`).
- No new icon packages; keep lucide-react.
- Pulse/morph animations: plain CSS keyframes in `src/index.css`, scoped with variant-specific class names. No animation library.

## What we're NOT building

- A/B analytics or score-keeping — user compares subjectively.
- Variable duration knob — hardcoded 11,000 ms. Changing it is a code edit, not a setting.
- Multiple prompts or response lengths — single fixture.
- Keyboard shortcuts for switching variants.
- Loading-state cancellation / "stop generating" — out of scope.

## Open questions (defer)

- Should Variant C's stream rate vary (fast start / slow end) to feel more human? Test first with a constant rate.
- Should Variant D's acknowledgment be randomized from a small set? No — keep it deterministic for honest comparison.
- Is 11s long enough for Variant C's stream to not look unnaturally slow? The 220 ms/token cadence is on the slow end of human reading but matches real AI products on longer responses. Revisit if it looks dragged.
