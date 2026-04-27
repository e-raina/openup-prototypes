import { FINAL_RESPONSE } from "./fixtures";
import { ResponseBlock } from "./elements";
import { useTimeline, type Phase } from "./useTimeline";

const PHASES: Phase[] = [
  { at: 0, id: "loading" },
  { at: 10_700, id: "settle" },
  { at: 11_000, id: "final" },
];

export function VariantA_Thinking({ sent }: { sent: boolean }) {
  const phase = useTimeline(PHASES, sent);
  if (!sent) return null;

  if (phase === "final") return <ResponseBlock>{FINAL_RESPONSE}</ResponseBlock>;
  if (phase === "settle") return <div className="h-6" />;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-[6px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="speedlab-prod-wave block size-1 rounded-full bg-[#0690f1]"
            style={{ animationDelay: `${i * 0.18}s` }}
          />
        ))}
      </div>
      <p className="text-[15px] font-semibold text-[#0690f1]">Thinking...</p>
    </div>
  );
}
