import { Navbar } from "../components/Navbar";

type ExperimentStatus = "exploration" | "handover" | "shipped" | "archived";

type Experiment = {
  slug: string;
  title: string;
  blurb: string;
  status: ExperimentStatus;
  owner: string;
  date: string;
  url: string;
  handoverUrl?: string;
  figmaUrl?: string;
};

const EXPERIMENTS: Experiment[] = [
  {
    slug: "ai-guide-loading",
    title: "AI Guide — Loading UI",
    blurb:
      "Two prototypes (C-2 step cadence + D ambient companion) for masking model latency. Includes early/late response edge cases.",
    status: "handover",
    owner: "Hannah",
    date: "2026-04",
    url: "/ai-guide-loading",
    figmaUrl:
      "https://www.figma.com/design/A6wya1hopV9eNlHunRRjYs/-Exploration--OpenUp-AI-Companion",
  },
];

// Older one-off prototypes from earlier rounds. Kept reachable via direct URL.
const LEGACY_ROUTES: { path: string; label: string }[] = [
  { path: "/content", label: "Beta content" },
  { path: "/chat-content", label: "Chat content" },
  { path: "/chat", label: "Chat disclaimer" },
  { path: "/beta", label: "Beta opt-in" },
  { path: "/combined", label: "Combined opt-in" },
  { path: "/mobile", label: "Mobile opt-in" },
];

const STATUS_LABEL: Record<ExperimentStatus, string> = {
  exploration: "Exploration",
  handover: "Handover ready",
  shipped: "Shipped",
  archived: "Archived",
};

const STATUS_TONE: Record<ExperimentStatus, string> = {
  exploration: "bg-bg-interactive text-text-primary",
  handover: "bg-graphic-primary/15 text-button-primary-default",
  shipped: "bg-graphic-primary/30 text-button-primary-default",
  archived: "bg-graphic-disabled/40 text-text-secondary",
};

export function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-lvl1">
      <Navbar />
      <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col gap-12 px-8 py-16">
        <header className="flex flex-col gap-3">
          <span className="text-[12px] font-semibold uppercase tracking-[1.5px] text-button-primary-default">
            OpenUp · Design prototypes
          </span>
          <h1 className="text-[48px] font-semibold leading-[1.1] text-text-primary">
            Design explorations
          </h1>
          <p className="max-w-[640px] text-[16px] leading-[1.6] text-text-secondary">
            Live prototypes paired with engineering handover specs. Each experiment is
            self-contained — clone the repo, run it locally, or click through to the
            live URL.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <h2 className="text-[14px] font-semibold uppercase tracking-[1.2px] text-text-secondary">
            Active experiments
          </h2>
          <div className="grid gap-4">
            {EXPERIMENTS.map((exp) => (
              <a
                key={exp.slug}
                href={exp.url}
                className="group flex flex-col gap-4 rounded-2xl border border-border-primary bg-bg-lvl3 p-8 transition-colors hover:border-border-hover"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.1px] ${STATUS_TONE[exp.status]}`}
                  >
                    {STATUS_LABEL[exp.status]}
                  </span>
                  <span className="text-[12px] text-text-secondary">
                    {exp.owner} · {exp.date}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[24px] font-semibold leading-[1.2] text-text-primary group-hover:text-button-primary-default">
                    {exp.title} →
                  </h3>
                  <p className="max-w-[640px] text-[15px] leading-[1.5] text-text-secondary">
                    {exp.blurb}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-[12px] font-medium text-button-primary-default">
                  <span>Open prototype</span>
                  {exp.figmaUrl && (
                    <a
                      href={exp.figmaUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="underline"
                    >
                      Figma →
                    </a>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-[14px] font-semibold uppercase tracking-[1.2px] text-text-secondary">
            Legacy explorations
          </h2>
          <p className="text-[13px] text-text-secondary">
            Older one-off prototypes from earlier rounds — not yet migrated into the new
            structure but still reachable.
          </p>
          <ul className="grid grid-cols-2 gap-2 text-[13px]">
            {LEGACY_ROUTES.map((r) => (
              <li key={r.path}>
                <a
                  href={r.path}
                  className="text-button-primary-default underline-offset-2 hover:underline"
                >
                  {r.label}
                </a>
                <span className="ml-2 text-text-secondary">{r.path}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
