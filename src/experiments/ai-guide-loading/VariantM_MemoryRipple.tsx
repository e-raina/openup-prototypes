import { useMemo } from "react";
import { FINAL_RESPONSE, TOTAL_DURATION_MS } from "./fixtures";
import { AmbientOverlay } from "./AmbientOverlay";
import { LoaderAvatar } from "./LoaderAvatar";
import { ResponseBlock } from "./elements";
import { useTimeline, type Phase } from "./useTimeline";

// Captions advance every 2000ms. Settle/final fire when the response arrives.
// Spec note: Figma copy says "rotate between 5 loading copy" but only 4 are listed
// — proceeding with 4. Open question for product.
const CAPTION_PHASES: Phase[] = [
  { at: 0, id: "p1" },
  { at: 2_000, id: "p2" },
  { at: 4_000, id: "p3" },
  { at: 6_000, id: "p4" },
];
const SETTLE_FADE_MS = 200;

const CAPTIONS: Record<string, string> = {
  p1: "Taking this in",
  p2: "This is allowed to be hard",
  p3: "Feelings don't always make sense",
  p4: "Hard days happen",
};

type Spark = { sx: number; sy: number; delay: number };

const SPARKS: Spark[] = [
  { sx: 42, sy: -26, delay: 0 },
  { sx: -34, sy: 30, delay: 0.6 },
  { sx: 46, sy: 22, delay: 1.2 },
  { sx: -42, sy: -22, delay: 1.8 },
  { sx: 30, sy: -38, delay: 2.4 },
];

const FREEZE_MAP: Record<string, string> = {
  "0": "p1", "1": "p2", "2": "p3", "3": "p4",
  "settle": "settle", "final": "final",
};

export function VariantM_MemoryRipple({
  sent,
  freeze,
  responseArrivedAt = TOTAL_DURATION_MS,
}: {
  sent: boolean;
  freeze?: string | null;
  responseArrivedAt?: number;
}) {
  // Build phase timeline based on when the response actually arrives.
  // Early arrival: drop caption transitions that would land after settle starts —
  // current caption stays on screen, then fades out.
  // Late arrival: p4 ("Hard days happen") loops indefinitely until response arrives,
  // since no further caption transitions are scheduled past it.
  const phases = useMemo<Phase[]>(() => {
    const settleAt = Math.max(0, responseArrivedAt - SETTLE_FADE_MS);
    const captions = CAPTION_PHASES.filter((p) => p.at < settleAt);
    return [
      ...captions,
      { at: settleAt, id: "settle" },
      { at: responseArrivedAt, id: "final" },
    ];
  }, [responseArrivedAt]);

  const livePhase = useTimeline(phases, sent);
  const phase = freeze != null && FREEZE_MAP[freeze] ? FREEZE_MAP[freeze] : livePhase;
  if (!sent) return null;

  if (phase === "final") return <ResponseBlock>{FINAL_RESPONSE}</ResponseBlock>;
  if (phase === "settle") return <div className="h-20" />;

  const caption = CAPTIONS[phase];

  return (
    <>
      <AmbientOverlay />
      <div className="relative flex items-center gap-6">
        <div className="relative size-12 shrink-0">
          {/* Expanding concentric ripples — colored via DS Graphic/Primary (green/500) */}
          <div
            className="absolute inset-0 rounded-full border-2 border-graphic-primary/40"
            style={{ animation: "speedlab-ripple 3.6s cubic-bezier(0, 0, 0.2, 1) infinite" }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-graphic-primary/30"
            style={{
              animation: "speedlab-ripple 3.6s cubic-bezier(0, 0, 0.2, 1) infinite",
              animationDelay: "-1.2s",
            }}
          />
          <div
            className="absolute inset-0 rounded-full border-2 border-graphic-primary/20"
            style={{
              animation: "speedlab-ripple 3.6s cubic-bezier(0, 0, 0.2, 1) infinite",
              animationDelay: "-2.4s",
            }}
          />

          {/* Incoming sparks — travel from outer positions into the avatar */}
          {SPARKS.map((s, i) => (
            <span
              key={i}
              className="speedlab-spark-in absolute left-1/2 top-1/2 block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bg-lvl3"
              style={
                {
                  "--sx": `${s.sx}px`,
                  "--sy": `${s.sy}px`,
                  animationDelay: `${s.delay}s`,
                  boxShadow: "0 0 8px rgba(0, 168, 133, 0.9)",
                } as React.CSSProperties
              }
            />
          ))}

          <LoaderAvatar loading breathing size={48} />
        </div>
        <div
          key={phase}
          className="speedlab-caption-swap text-[13px] font-medium leading-[1.4] text-text-secondary"
        >
          {caption}
        </div>
      </div>
    </>
  );
}
