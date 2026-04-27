import type { ReactNode } from "react";
import { BulletList, type Bullet } from "./BulletList";

type Props = {
  title: string;
  items: Bullet[];
  action?: ReactNode;
  className?: string;
};

export function DisclaimerCard({ title, items, action, className = "" }: Props) {
  return (
    <div
      className={`bg-white rounded-2xl px-6 py-6 flex flex-col gap-4 shadow-[0_4px_24px_rgba(26,31,74,0.06)] ${className}`}
    >
      <h2 className="font-serif text-xl font-semibold text-slate-900">{title}</h2>
      <BulletList items={items} />
      {action && <div className="mt-2 self-start">{action}</div>}
    </div>
  );
}
