import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { FINAL_RESPONSE, TIMELINE_STAGES } from "./fixtures";
import { AmbientOverlay } from "./AmbientOverlay";
import { ResponseBlock } from "./elements";

type StageState = "pending" | "active" | "done";

function stateFor(nowMs: number, stage: (typeof TIMELINE_STAGES)[number]): StageState {
  if (nowMs >= stage.to) return "done";
  if (nowMs >= stage.from) return "active";
  return "pending";
}

// Map elapsed time to fill percent — each stage advances the line to the
// next dot, so growth happens in bursts tied to stage transitions. Line
// reaches 100% when the final stage (Writing) begins, then holds.
function computeFillPercent(nowMs: number): number {
  if (nowMs <= 0) return 0;
  const stages = TIMELINE_STAGES;
  const lastVisibleDotIndex = stages.length - 1;
  for (let i = 0; i < lastVisibleDotIndex; i++) {
    const stage = stages[i];
    if (nowMs < stage.to) {
      const segmentProgress = (nowMs - stage.from) / (stage.to - stage.from);
      const startPct = (i / lastVisibleDotIndex) * 100;
      const endPct = ((i + 1) / lastVisibleDotIndex) * 100;
      return startPct + segmentProgress * (endPct - startPct);
    }
  }
  return 100;
}

export function VariantF_Timeline({ sent }: { sent: boolean }) {
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    if (!sent) {
      setNowMs(0);
      return;
    }

    const start = performance.now();
    let rafId: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      setNowMs(elapsed);
      if (elapsed < 11_000) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [sent]);

  if (!sent) return null;
  if (nowMs >= 11_000) return <ResponseBlock>{FINAL_RESPONSE}</ResponseBlock>;

  const fillPercent = computeFillPercent(nowMs);

  return (
    <>
      <AmbientOverlay />
      <div className="relative flex flex-col gap-4 pl-1">
        {/* Vertical connecting line — spans between stage dots */}
        <div
          className="pointer-events-none absolute z-0 w-0.5 rounded-full bg-slate-200"
          style={{ left: 11, top: 8, bottom: 8 }}
        >
          <div
            className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-[#0690f1] via-[#00a885] to-[#187363]"
            style={{
              height: `${fillPercent}%`,
              transition: "height 80ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>

        {TIMELINE_STAGES.map((stage) => {
          const state = stateFor(nowMs, stage);
          return (
            <div key={stage.label} className="relative z-10 flex items-center gap-3">
              <StageIcon state={state} />
              <span
                className={`text-[14px] font-medium leading-[1.4] transition-colors duration-300 ${
                  state === "done"
                    ? "text-slate-700"
                    : state === "active"
                    ? "text-[#0690f1] speedlab-shimmer"
                    : "text-slate-400"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

function StageIcon({ state }: { state: StageState }) {
  if (state === "done") {
    return (
      <span className="relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_8px_rgba(0,168,133,0.4)]">
        <Check className="size-2.5" strokeWidth={3} />
      </span>
    );
  }
  if (state === "active") {
    return (
      <span className="relative z-10 flex size-4 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[#0690f1]/28 speedlab-ping" />
        <span className="block size-2 rounded-full bg-[#0690f1] shadow-[0_0_8px_rgba(6,144,241,0.65)]" />
      </span>
    );
  }
  return (
    <span className="relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full bg-white">
      <span className="block size-1.5 rounded-full bg-slate-300" />
    </span>
  );
}
