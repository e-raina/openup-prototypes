import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { FINAL_RESPONSE, TOTAL_DURATION_MS } from "./fixtures";
import { AmbientOverlay } from "./AmbientOverlay";
import { ResponseBlock } from "./elements";

type StepState = "pending" | "active" | "done";

const STEPS = [
  { label: "Listening to you", pillWidth: 120 },
  { label: "Thinking this through", pillWidth: 160 },
  { label: "Finding the right words", pillWidth: 180 },
  { label: "Almost with you", pillWidth: 110 },
] as const;

// Steps 1–3 each advance after 2000ms. Step 4 loops until the response arrives.
const STEP_INTERVAL_MS = 2000;
const EXIT_FADE_MS = 200;

export function VariantC2_StepCadence({
  sent,
  freeze,
  responseArrivedAt = TOTAL_DURATION_MS,
}: {
  sent: boolean;
  freeze?: string | null;
  responseArrivedAt?: number;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    if (freeze != null) {
      if (freeze === "final") {
        setShowResponse(true);
      } else {
        const n = Number(freeze);
        if (Number.isFinite(n)) {
          setCurrentStep(Math.max(0, Math.min(3, n)));
          setExiting(false);
          setShowResponse(false);
        }
      }
      return;
    }
    if (!sent) {
      setCurrentStep(0);
      setExiting(false);
      setShowResponse(false);
      return;
    }

    const timeouts: number[] = [];

    // Advance through steps 1 → 2 → 3 → 4 on a fixed cadence.
    // If the response arrives early, skip steps that would land after exit starts.
    const exitAt = Math.max(0, responseArrivedAt - EXIT_FADE_MS);
    for (let i = 1; i < STEPS.length; i++) {
      const stepAt = i * STEP_INTERVAL_MS;
      if (stepAt < exitAt) {
        timeouts.push(window.setTimeout(() => setCurrentStep(i), stepAt));
      }
    }

    // Exit when the response arrives — regardless of which step is active.
    // If the response is late (>8s), step 4 is already showing and naturally "loops"
    // via its breathing-halo animation until exit fires.
    timeouts.push(window.setTimeout(() => setExiting(true), exitAt));
    timeouts.push(
      window.setTimeout(() => setShowResponse(true), responseArrivedAt)
    );

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [sent, freeze, responseArrivedAt]);

  if (!sent) return null;
  if (showResponse) return <ResponseBlock>{FINAL_RESPONSE}</ResponseBlock>;

  return (
    <>
      <AmbientOverlay />
      <div
        className="relative flex flex-col gap-3 pl-1 transition-opacity"
        style={{
          opacity: exiting ? 0 : 1,
          transitionDuration: `${EXIT_FADE_MS}ms`,
        }}
      >
        {/* Vertical connecting line — matches Variant C. Fill advances with currentStep. */}
        <div
          className="pointer-events-none absolute z-0 w-0.5 rounded-full bg-border-primary"
          style={{ left: 11, top: 8, bottom: 8 }}
        >
          <div
            className="absolute inset-x-0 top-0 origin-top rounded-full bg-gradient-to-b from-[var(--color-loader-active-blue)] via-graphic-primary to-button-primary-default"
            style={{
              height: `${(currentStep / (STEPS.length - 1)) * 100}%`,
              transition: "height 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </div>

        {STEPS.map((step, i) => {
          const state: StepState =
            i < currentStep ? "done" : i === currentStep ? "active" : "pending";
          const isFinal = i === STEPS.length - 1;
          return (
            <StepRow
              key={step.label}
              label={step.label}
              pillWidth={step.pillWidth}
              state={state}
              isFinal={isFinal}
            />
          );
        })}
      </div>
    </>
  );
}

function StepRow({
  label,
  pillWidth,
  state,
  isFinal,
}: {
  label: string;
  pillWidth: number;
  state: StepState;
  isFinal: boolean;
}) {
  const showText = state !== "pending";

  return (
    <div className="relative z-10 flex items-center gap-3">
      <StepIcon state={state} isFinal={isFinal} />
      <div className="relative flex items-center" style={{ minHeight: 20 }}>
        {/* Skeleton pill — shown while pending, crossfades out when the step activates. */}
        <span
          aria-hidden
          className={`block rounded-full bg-graphic-disabled transition-opacity duration-300 ${
            showText ? "" : "animate-pulse"
          }`}
          style={{
            width: pillWidth,
            height: 12,
            opacity: showText ? 0 : 1,
          }}
        />
        {/* Text — crossfades in once the step is active, slides up 4px. */}
        <span
          className={`absolute left-0 text-[14px] font-medium leading-[1.4] transition-all duration-300 ${
            state === "done"
              ? "text-text-secondary"
              : state === "active"
              ? "text-text-primary speedlab-shimmer"
              : "text-text-secondary opacity-60"
          }`}
          style={{
            opacity: showText ? 1 : 0,
            transform: showText ? "translateY(0)" : "translateY(4px)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function StepIcon({ state, isFinal }: { state: StepState; isFinal: boolean }) {
  if (state === "done") {
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-graphic-primary text-icon-on-dark shadow-[0_0_8px_rgba(0,168,133,0.4)] transition-colors duration-300">
        <Check className="size-2.5" strokeWidth={3} />
      </span>
    );
  }
  if (state === "active") {
    // Final step uses a green filled dot + slow breathing halo to read as
    // "arrived at the destination, finalizing" rather than another waypoint.
    if (isFinal) {
      return (
        <span className="relative flex size-4 shrink-0 items-center justify-center">
          <span className="absolute -inset-1 rounded-full bg-graphic-primary/25 speedlab-breath" />
          <span className="block size-3 rounded-full bg-graphic-primary shadow-[0_0_10px_rgba(0,168,133,0.55)]" />
        </span>
      );
    }
    return (
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[var(--color-loader-active-blue)] opacity-30 speedlab-ping" />
        <span className="block size-2 rounded-full bg-[var(--color-loader-active-blue)] shadow-[0_0_8px_rgba(6,144,241,0.65)]" />
      </span>
    );
  }
  // Pending.
  // Final step pending: hollow ring — reads as a static "destination marker"
  // so users can see the endpoint before getting there.
  if (isFinal) {
    return (
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-border-hover bg-bg-lvl3" />
    );
  }
  return (
    <span className="flex size-4 shrink-0 animate-pulse items-center justify-center rounded-full bg-graphic-disabled">
      <span className="block size-1.5 rounded-full bg-border-hover" />
    </span>
  );
}
