import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  trailing?: ReactNode;
};

export function NavLink({ children, active = false, href = "#", onClick, trailing }: Props) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 h-[70px] px-1 pt-1 border-b-2 transition-colors ${
        active
          ? "border-green-700 text-slate-700"
          : "border-transparent text-slate-700 hover:text-green-700"
      }`}
    >
      <span className="text-sm font-semibold tracking-[0.1px]">{children}</span>
      {trailing}
    </a>
  );
}
