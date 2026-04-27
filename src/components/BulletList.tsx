import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

export type Bullet = {
  icon: ComponentType<LucideProps>;
  text: ReactNode;
};

type Props = {
  items: Bullet[];
  className?: string;
  iconClassName?: string;
};

export function BulletList({
  items,
  className = "",
  iconClassName = "text-green-700",
}: Props) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <item.icon
            className={`size-5 shrink-0 mt-0.5 ${iconClassName}`}
            strokeWidth={1.75}
          />
          <span className="text-sm font-medium text-slate-800 leading-snug flex-1">
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
