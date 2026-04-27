import { AmbientOverlay } from "./AmbientOverlay";
import { VariantD_Breathing } from "./VariantD_Breathing";
import { useTimeline, type Phase } from "./useTimeline";

const AMBIENT_PHASES: Phase[] = [
  { at: 0, id: "on" },
  { at: 10_700, id: "off" },
];

export function VariantN_AmbientBreathing({ sent }: { sent: boolean }) {
  const ambientPhase = useTimeline(AMBIENT_PHASES, sent);
  if (!sent) return null;
  return (
    <>
      {ambientPhase === "on" && <AmbientOverlay />}
      <VariantD_Breathing sent={sent} />
    </>
  );
}
