type Props = {
  initials: string;
  size?: number;
  className?: string;
};

export function Avatar({ initials, size = 40, className = "" }: Props) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold text-green-500 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "rgba(0, 168, 133, 0.1)",
        fontSize: Math.round(size * 0.3),
      }}
    >
      {initials}
    </div>
  );
}
