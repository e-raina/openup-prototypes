import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { ChatShell } from "./ChatShell";
import { VariantA_Thinking } from "./VariantA_Thinking";
import { VariantC2_StepCadence } from "./VariantC2_StepCadence";
import { VariantE_Scratchpad } from "./VariantE_Scratchpad";
import { VariantF_Timeline } from "./VariantF_Timeline";
import { VariantM_MemoryRipple } from "./VariantM_MemoryRipple";
import { VariantN_AmbientBreathing } from "./VariantN_AmbientBreathing";

type VariantId = "A" | "B" | "C" | "C2" | "D" | "E";

const ALL_IDS: VariantId[] = ["A", "B", "C", "C2", "D", "E"];

const VARIANT_LABELS: Record<VariantId, string> = {
  A: "A",
  B: "B",
  C: "C",
  C2: "C-2",
  D: "D",
  E: "E",
};

function getInitialVariant(): VariantId {
  if (typeof window === "undefined") return "A";
  const raw = new URLSearchParams(window.location.search).get("v")?.toUpperCase() ?? "";
  if (ALL_IDS.includes(raw as VariantId)) return raw as VariantId;
  return "A";
}

function getFreezeParam(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("freeze");
}

function getResponseAtParam(): number | undefined {
  if (typeof window === "undefined") return undefined;
  const raw = new URLSearchParams(window.location.search).get("response");
  if (raw == null) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function ChatSpeedLab() {
  const [variant, setVariant] = useState<VariantId>(getInitialVariant);
  const [sent, setSent] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const freeze = getFreezeParam();
  const responseArrivedAt = getResponseAtParam();

  useEffect(() => {
    if (freeze !== null) setSent(true);
  }, [freeze]);

  function handleSend() {
    setSent(true);
  }

  function reset() {
    setSent(false);
    setResetKey((k) => k + 1);
  }

  function switchVariant(v: VariantId) {
    setVariant(v);
    reset();
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("v", v);
      window.history.replaceState({}, "", url.toString());
    }
  }

  const topBar = (
    <div className="mx-auto w-full max-w-[1440px] px-16 pb-4">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/70 px-5 py-3 shadow-[0_2px_12px_rgba(26,31,74,0.04)] backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-slate-700">
            Variant
          </span>
          <div className="flex gap-1.5">
            {ALL_IDS.map((id) => {
              const active = id === variant;
              const label = VARIANT_LABELS[id];
              const wide = label.length > 1;
              return (
                <button
                  key={id}
                  onClick={() => switchVariant(id)}
                  className={`inline-flex h-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    wide ? "px-3" : "w-8"
                  } ${
                    active
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-200/80"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={reset}
          disabled={!sent}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="size-4" />
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <ChatShell sent={sent} topBar={topBar} resetKey={resetKey} onSend={handleSend}>
      {variant === "A" && <VariantA_Thinking sent={sent} />}
      {variant === "B" && <VariantE_Scratchpad sent={sent} />}
      {variant === "C" && <VariantF_Timeline sent={sent} />}
      {variant === "C2" && (
        <VariantC2_StepCadence sent={sent} freeze={freeze} responseArrivedAt={responseArrivedAt} />
      )}
      {variant === "D" && (
        <VariantM_MemoryRipple sent={sent} freeze={freeze} responseArrivedAt={responseArrivedAt} />
      )}
      {variant === "E" && <VariantN_AmbientBreathing sent={sent} />}
    </ChatShell>
  );
}
