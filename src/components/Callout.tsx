import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

type Tone = "info" | "success" | "warning";

type Props = {
  icon: ComponentType<LucideProps>;
  children: ReactNode;
  tone?: Tone;
  className?: string;
};

const toneClasses: Record<Tone, { bg: string; icon: string; text: string }> = {
  info: { bg: "bg-green-50", icon: "text-green-700", text: "text-slate-800" },
  success: { bg: "bg-green-50", icon: "text-green-700", text: "text-slate-800" },
  warning: { bg: "bg-orange-200", icon: "text-green-700", text: "text-slate-800" },
};

export function Callout({ icon: Icon, children, tone = "success", className = "" }: Props) {
  const t = toneClasses[tone];
  return (
    <div className={`flex items-start gap-3 ${t.bg} rounded-2xl px-5 py-4 ${className}`}>
      <Icon className={`size-5 shrink-0 mt-0.5 ${t.icon}`} strokeWidth={1.75} />
      <p className={`text-sm font-medium leading-snug ${t.text}`}>{children}</p>
    </div>
  );
}
