type Props = {
  className?: string;
};

export function Logo({ className = "" }: Props) {
  return (
    <span
      className={`font-bold text-green-500 text-2xl tracking-tight lowercase ${className}`}
    >
      openup
    </span>
  );
}
