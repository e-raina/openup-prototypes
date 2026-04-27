# <Experiment Title>

> Status: Exploration | Handover ready | Shipped — | Owner: <Name> | Last updated: YYYY-MM-DD

**Live:** https://openup-speedlab.netlify.app/<slug>
**Figma:** <link>
**Source:** [`src/experiments/<slug>/`](.)

## TL;DR

One paragraph. What's the design, what problem does it solve, what's the headline behavior. Keep it under 80 words so engineers know if they need to read further.

## Context & problem

What's the user pain or product gap? Cite metrics if you have them. Why does this matter now?

## Design proposal

What we're proposing. If there are multiple variants, list each with a one-line hypothesis (why might this work).

| Variant | Hypothesis |
|---|---|
| A | … |
| B | … |

## Behavior spec

The state machine, in plain English.

- **Initial state:** what the user sees on mount
- **Trigger:** what causes the state to advance
- **Transitions:** ordered list of state changes with timing
- **Exit:** how the experience ends

If timing is involved, table it:

| Step | When | Visual change |
|---|---|---|
| 1 | t=0 | … |
| 2 | t=2000ms | … |

## Edge cases

What happens when reality diverges from the happy path?

- **Early arrival:** …
- **Late arrival / timeout:** …
- **Error:** …

## Component API

For each prototype component, document its public surface. Engineers will re-implement in the production codebase but the API shape should match.

```tsx
<YourComponent
  sent={boolean}             // user has submitted
  responseArrivedAt={number} // ms after sent — for testing/edge cases
  freeze={string | null}     // dev-only, freezes a state for capture
/>
```

## URL params (for testing)

If the prototype exposes query params for deep-linking to specific states, document them:

| Param | Values | Purpose |
|---|---|---|
| `?v=` | `A`, `B`, … | Switch variant |
| `?freeze=` | `0`–`N`, `final` | Freeze a specific moment for capture |

## Tokens

Confirm which OpenUp DS tokens this experiment uses, and call out anything that has no DS alias yet.

| Use | DS token | Notes |
|---|---|---|
| Page background | `BG/Lvl1` | |
| Body text | `Text/Primary` | |
| Brand accent | `Graphic/Primary` | |
| <unique color> | (no DS alias) | proposal: introduce `<NewToken/Name>` |

See [`docs/openup-ds-tokens.md`](../../../docs/openup-ds-tokens.md) for the full reference.

## Open questions for engineering

Front-load decisions that block design. Each question should be answerable.

1. **<Question>** — context + why it matters + what the answer changes.
2. **<Question>**
3. **<Question>**

## Out of scope

What deliberately isn't in this prototype, and why.

## Changelog

- YYYY-MM-DD — Initial handover
