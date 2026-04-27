import { useEffect, useState } from "react";
import { FINAL_RESPONSE, SCRATCHPAD_FRAGMENTS } from "./fixtures";
import { AmbientOverlay } from "./AmbientOverlay";
import { LoaderAvatar } from "./LoaderAvatar";
import { ResponseBlock } from "./elements";

const FADE_START_MS = 9_000;
const FADE_DURATION_MS = 1_700;
const FINAL_MS = 11_000;
const CHAR_MS = 28;

export function VariantE_Scratchpad({ sent }: { sent: boolean }) {
  const [nowMs, setNowMs] = useState(0);
  const [fading, setFading] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (!sent) {
      setNowMs(0);
      setFading(false);
      setShowFinal(false);
      return;
    }

    const start = performance.now();
    let rafId: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      setNowMs(elapsed);
      if (elapsed < FINAL_MS) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const fadeTimer = setTimeout(() => setFading(true), FADE_START_MS);
    const finalTimer = setTimeout(() => setShowFinal(true), FINAL_MS);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fadeTimer);
      clearTimeout(finalTimer);
    };
  }, [sent]);

  if (!sent) return null;
  if (showFinal) return <ResponseBlock>{FINAL_RESPONSE}</ResponseBlock>;

  const visible = SCRATCHPAD_FRAGMENTS.filter((f) => nowMs >= f.at);
  const currentIdx = visible.length - 1;

  return (
    <>
      <AmbientOverlay />
      <div className="relative flex flex-col items-start gap-5">
        <div className="speedlab-avatar-glow">
          <LoaderAvatar loading breathing />
        </div>
        <div
          className="flex max-w-[640px] flex-col gap-1.5"
          style={{
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_DURATION_MS}ms ease-out`,
          }}
        >
          {visible.map((f, i) => {
            const charsElapsed = Math.max(0, Math.floor((nowMs - f.at) / CHAR_MS));
            const charsToShow = Math.min(f.text.length, charsElapsed);
            const displayed = f.text.slice(0, charsToShow);
            const isCurrent = i === currentIdx;
            const isTyping = isCurrent && charsToShow < f.text.length;

            return (
              <p
                key={i}
                className="text-[13px] leading-[1.55] text-slate-700"
              >
                {displayed}
                {isTyping && <span className="speedlab-cursor align-middle" />}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
