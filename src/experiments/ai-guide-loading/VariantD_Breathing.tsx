import { FINAL_RESPONSE } from "./fixtures";
import { LoaderAvatar } from "./LoaderAvatar";
import { ResponseBlock } from "./elements";
import { useTimeline, type Phase } from "./useTimeline";

const PHASES: Phase[] = [
  { at: 0, id: "p1" },
  { at: 2_750, id: "p2" },
  { at: 5_500, id: "p3" },
  { at: 8_250, id: "p4" },
  { at: 10_700, id: "settle" },
  { at: 11_000, id: "final" },
];

const CAPTIONS: Record<string, string> = {
  p1: "Taking this in",
  p2: "Reflecting",
  p3: "Considering",
  p4: "Almost ready",
};

// Orb anchored at left; the ambient overlay behind the composer already
// provides the warm wash so no halos are layered behind the orb here.
const CX = 30;
const CY = 60;

export function VariantD_Breathing({ sent }: { sent: boolean }) {
  const phase = useTimeline(PHASES, sent);
  if (!sent) return null;

  if (phase === "final") return <ResponseBlock>{FINAL_RESPONSE}</ResponseBlock>;
  if (phase === "settle") return <div className="h-24" />;

  const intensity = phase === "p1" ? 0 : phase === "p2" ? 1 : phase === "p3" ? 2 : 3;

  return (
    <div className="flex flex-col items-start gap-4 py-2">
      <div className="relative" style={{ width: 160, height: 120 }}>
        {/* Orbiting firefly — kept because it's tiny motion, not a halo */}
        <div
          className="pointer-events-none absolute"
          style={{ left: CX - 2, top: CY - 2, width: 4, height: 4 }}
        >
          <div
            className="speedlab-orbit size-full rounded-full bg-white"
            style={{
              boxShadow: "0 0 8px rgba(255, 240, 200, 0.9)",
            }}
          />
        </div>

        {/* Sparkle accents — from p4, scattered around the orb */}
        {intensity >= 3 && (
          <>
            <span
              className="speedlab-sparkle absolute block size-1 rounded-full bg-white"
              style={{
                top: CY - 34,
                left: CX + 38,
                boxShadow: "0 0 6px rgba(0,168,133,0.7)",
              }}
            />
            <span
              className="speedlab-sparkle absolute block size-1 rounded-full bg-white"
              style={{
                top: CY + 38,
                left: CX - 18,
                animationDelay: "-0.6s",
                boxShadow: "0 0 6px rgba(0,168,133,0.7)",
              }}
            />
            <span
              className="speedlab-sparkle absolute block size-[3px] rounded-full bg-white"
              style={{
                top: CY + 12,
                left: CX + 54,
                animationDelay: "-1.1s",
                boxShadow: "0 0 5px rgba(0,168,133,0.6)",
              }}
            />
          </>
        )}

        {/* Main orb — drifts & breathes, left-aligned */}
        <div
          className="absolute"
          style={{ left: CX - 26, top: CY - 26 }}
        >
          <div className="speedlab-orb-drift">
            <LoaderAvatar loading breathing size={52} />
          </div>
        </div>
      </div>

      <div
        key={phase}
        className="speedlab-caption-swap text-[13px] font-medium tracking-wide text-slate-700"
      >
        {CAPTIONS[phase]}
      </div>
    </div>
  );
}
