import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-green-700 text-orange-50 hover:bg-green-900 active:bg-green-900 disabled:opacity-50",
  secondary:
    "bg-orange-100 text-green-700 hover:bg-orange-200 disabled:opacity-50",
  ghost:
    "bg-transparent text-green-700 hover:bg-green-50 disabled:opacity-50",
  danger:
    "bg-[#ffe5e8] text-[#db4446] border border-[#db4446] hover:bg-[#ffd6da] disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-10 px-3 text-sm gap-2",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2",
};

export function Button({
  children,
  variant = "primary",
  size = "lg",
  leadingIcon,
  className = "",
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-pill font-semibold transition-colors cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
