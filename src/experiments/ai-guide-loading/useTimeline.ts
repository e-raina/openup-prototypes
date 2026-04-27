import { useEffect, useState } from "react";

export type Phase = { at: number; id: string };

export function useTimeline(phases: Phase[], running: boolean): string {
  const initialId = phases[0]?.id ?? "";
  const [phaseId, setPhaseId] = useState(initialId);

  useEffect(() => {
    if (!running) {
      setPhaseId(initialId);
      return;
    }

    setPhaseId(initialId);
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i < phases.length; i++) {
      const p = phases[i];
      timeouts.push(setTimeout(() => setPhaseId(p.id), p.at));
    }

    return () => {
      for (const t of timeouts) clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phases]);

  return phaseId;
}
