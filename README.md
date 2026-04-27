# OpenUp Design Prototypes

A reusable repo for OpenUp design explorations and engineering handovers. One Vite app, one Netlify deploy, many experiments.

**Live:** https://openup-speedlab.netlify.app

## What this repo is

Each `experiment` is a self-contained design exploration with:
- A live prototype (React + Tailwind v4) at `/<experiment-slug>`
- A `HANDOVER.md` with the engineering spec
- Optional Figma link for visual review

The repo provides shared infrastructure so designers don't redo OpenUp scaffolding every time:
- OpenUp End-User Design System tokens (in `src/index.css`)
- Shared OpenUp components (Navbar, Avatar, etc. in `src/components/`)
- Routing + landing page that lists active experiments

## Run locally

```bash
npm install
npm run dev    # http://localhost:5173
```

## Add a new experiment

1. Create `src/experiments/<your-experiment-slug>/` with at least:
   - `index.ts` — re-export the entry component as default
   - `HANDOVER.md` — copy [`HANDOVER_TEMPLATE.md`](./HANDOVER_TEMPLATE.md) and fill it in
   - Your prototype components

2. Add a route in `src/App.tsx`:
   ```tsx
   import YourExperiment from "./experiments/your-experiment-slug";
   // ...
   if (path.startsWith("/your-experiment-slug")) return <YourExperiment />;
   ```

3. Add an entry to the `EXPERIMENTS` array in `src/pages/Landing.tsx` so it shows on the home page.

4. Reuse OpenUp DS tokens — see [`docs/openup-ds-tokens.md`](./docs/openup-ds-tokens.md) for the full reference. Use semantic Theme tokens (`bg-bg-lvl1`, `text-text-primary`, `bg-graphic-primary`) before reaching for Foundation primitives or raw hex.

## Deploy

Netlify auto-deploys from the linked branch. To deploy manually:

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

## Repo structure

```
src/
├── App.tsx                       # router
├── index.css                     # OpenUp DS tokens (Foundation + Theme)
├── components/                   # shared OpenUp components
│   ├── Navbar.tsx
│   ├── Avatar.tsx
│   └── ...
├── pages/
│   └── Landing.tsx               # / — lists active experiments
└── experiments/
    └── ai-guide-loading/         # current experiment
        ├── index.ts
        ├── HANDOVER.md
        ├── ChatSpeedLab.tsx
        └── ...
docs/
└── openup-ds-tokens.md           # token reference
HANDOVER_TEMPLATE.md              # copy this for new experiments
```

## Conventions

- **One experiment per folder under `src/experiments/`.** Don't share components across experiments unless they belong in `src/components/`.
- **HANDOVER.md is the source of truth** for each experiment's engineering spec. Live URL shows behavior, code shows values, HANDOVER.md ties them together.
- **Use OpenUp DS tokens.** If a color/spacing isn't in the DS yet, comment it as a candidate for a new alias rather than committing raw hex without flagging.
- **URL params for testing states.** Where prototypes have multiple states, expose them via query params (e.g., `?freeze=N`, `?response=ms`) so engineers can deep-link to specific moments.
