import type { ReactNode } from "react";

type Variant = "solid" | "soft";
type Size = "sm" | "md";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

const variantClasses: Record<Variant, string> = {
  solid: "bg-green-700 text-orange-50",
  soft: "bg-green-50 text-green-700",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-6 px-2 text-xs",
  md: "h-8 px-3 text-sm",
};

export function Badge({ children, variant = "solid", size = "sm", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-pill font-semibold leading-none whitespace-nowrap ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
