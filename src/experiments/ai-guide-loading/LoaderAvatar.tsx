export type Pose = "center" | "lean-forward" | "lean-back" | "lean-right";

const POSE_TRANSFORMS: Record<Pose, string> = {
  center: "translate(0px, 0px) rotate(0deg)",
  "lean-forward": "translate(0px, -0.7px) rotate(-4deg)",
  "lean-back": "translate(0px, 0.8px) scale(0.94)",
  "lean-right": "translate(0.8px, 0px) rotate(4deg)",
};

type Props = {
  breathing?: boolean;
  loading?: boolean;
  size?: number;
  pose?: Pose;
};

export function LoaderAvatar({
  breathing = true,
  loading = true,
  size = 48,
  pose,
}: Props) {
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Wide ambient green glow */}
      {loading && (
        <div
          className="speedlab-glow-pulse pointer-events-none absolute rounded-full"
          style={{
            inset: -18,
            background:
              "radial-gradient(circle, rgba(132,210,183,0.4) 0%, rgba(132,210,183,0.12) 35%, rgba(132,210,183,0) 72%)",
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Honey warmth glow */}
      {loading && (
        <div
          className="speedlab-glow-warm pointer-events-none absolute rounded-full"
          style={{
            inset: -14,
            background:
              "radial-gradient(circle, rgba(255,223,178,0.32) 0%, rgba(255,223,178,0) 68%)",
            filter: "blur(2px)",
          }}
        />
      )}

      {/* Main orb wrapper — breathes */}
      <div
        className={`relative size-full ${breathing ? "speedlab-breath" : ""}`}
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 48 48" className="block size-full overflow-visible">
          <defs>
            {/* Base — fades to transparent at the edge, no hard boundary */}
            <radialGradient
              id="lapz-orb-base"
              cx="22"
              cy="20"
              r="26"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#e7f5ec" />
              <stop offset="0.3" stopColor="#a7d9c4" />
              <stop offset="0.65" stopColor="#5fa894" stopOpacity="0.95" />
              <stop offset="0.85" stopColor="#3d7f6d" stopOpacity="0.5" />
              <stop offset="1" stopColor="#3d7f6d" stopOpacity="0" />
            </radialGradient>

            {/* Warm top-left honey accent */}
            <radialGradient
              id="lapz-orb-warm"
              cx="16"
              cy="14"
              r="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff1d6" stopOpacity="0.38" />
              <stop offset="0.7" stopColor="#fff1d6" stopOpacity="0" />
            </radialGradient>

            {/* Inner pearl — cream luminescence */}
            <radialGradient
              id="lapz-orb-pearl"
              cx="24"
              cy="24"
              r="10"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff9eb" stopOpacity="0.55" />
              <stop offset="0.45" stopColor="#fff9eb" stopOpacity="0.15" />
              <stop offset="1" stopColor="#fff9eb" stopOpacity="0" />
            </radialGradient>

            {/* Diffuse top-left sheen */}
            <radialGradient
              id="lapz-orb-shine"
              cx="16"
              cy="13"
              r="14"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
              <stop offset="0.7" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>

            {/* Heavy blur filter — magical edge dissolve */}
            <filter
              id="lapz-orb-magic"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feGaussianBlur stdDeviation="1.4" />
            </filter>

            {/* Subtle blur filter for the pearl — keeps it soft but focused */}
            <filter
              id="lapz-pearl-soft"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>

          {/* Base orb + warm accent — grouped under heavy blur so edges dissolve */}
          <g filter="url(#lapz-orb-magic)">
            <circle cx="24" cy="24" r="22" fill="url(#lapz-orb-base)" />
            <circle cx="24" cy="24" r="22" fill="url(#lapz-orb-warm)" />
          </g>

          {/* Inner pearl — slightly softened, drifts gently */}
          <g
            className={pose ? "speedlab-pose" : loading ? "speedlab-pearl" : ""}
            style={pose ? { transform: POSE_TRANSFORMS[pose] } : undefined}
            filter="url(#lapz-pearl-soft)"
          >
            <circle cx="24" cy="24" r="9" fill="url(#lapz-orb-pearl)" />
          </g>

          {/* Soft diffuse top-left sheen — adds dimension without hard highlight */}
          <circle cx="24" cy="24" r="22" fill="url(#lapz-orb-shine)" filter="url(#lapz-pearl-soft)" />
        </svg>
      </div>
    </div>
  );
}
