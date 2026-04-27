type Props = {
  count?: number;
  className?: string;
};

const LAYOUT: { top: string; left: string; size: number; delay: number; track: 1 | 2 | 3 }[] = [
  { top: "12%", left: "8%", size: 3, delay: 0, track: 1 },
  { top: "68%", left: "15%", size: 2, delay: 1.4, track: 2 },
  { top: "30%", left: "22%", size: 4, delay: 2.8, track: 3 },
  { top: "82%", left: "35%", size: 3, delay: 0.8, track: 1 },
  { top: "22%", left: "48%", size: 2, delay: 3.4, track: 2 },
  { top: "58%", left: "60%", size: 4, delay: 1.8, track: 3 },
  { top: "8%", left: "72%", size: 3, delay: 2.2, track: 1 },
  { top: "74%", left: "85%", size: 2, delay: 0.4, track: 2 },
  { top: "42%", left: "92%", size: 4, delay: 3.0, track: 3 },
];

export function DriftingParticles({ count = 9, className = "" }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {LAYOUT.slice(0, count).map((p, i) => (
        <span
          key={i}
          className={`speedlab-drift-${p.track} absolute block rounded-full`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0 0 6px rgba(253, 220, 165, 0.7)",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
