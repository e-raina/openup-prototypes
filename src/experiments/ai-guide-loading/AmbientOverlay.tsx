// Ambience uses three layered radial gradients behind the composer.
// Color sources:
//  - Warm amber (#FDBF87) and honey accent (#FDDB87) have NO direct DS alias —
//    they're peach tones outside the current OpenUp palette. Strong candidates
//    for new tokens (e.g., Graphic/Ambient-warm, Graphic/Ambient-honey).
//  - Green tint maps to DS Graphic/Primary (green/500 = #00A885).
const AMBIENCE_AMBER  = "rgba(253, 191, 135, 0.65)"; // candidate: --color-ambient-warm
const AMBIENCE_GREEN  = "rgba(0, 168, 133, 0.3)";    // derived from Graphic/Primary
const AMBIENCE_HONEY  = "rgba(253, 219, 135, 0.4)";  // candidate: --color-ambient-honey

export function AmbientOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Main warm glow — concentrated around the composer area */}
      <div
        className="speedlab-ambient-warm absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse 60% 45% at 50% 94%, ${AMBIENCE_AMBER} 0%, rgba(253,191,135,0) 75%)`,
        }}
      />
      {/* Green tint — left of composer (derived from Graphic/Primary) */}
      <div
        className="speedlab-ambient-green absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse 42% 32% at 28% 90%, ${AMBIENCE_GREEN} 0%, rgba(0,168,133,0) 75%)`,
        }}
      />
      {/* Honey accent — right of composer */}
      <div
        className="speedlab-ambient-warm absolute inset-0"
        style={{
          background:
            `radial-gradient(ellipse 38% 28% at 72% 92%, ${AMBIENCE_HONEY} 0%, rgba(253,219,135,0) 75%)`,
          animationDelay: "-1.4s",
        }}
      />
    </div>
  );
}
