import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { BulletList, type Bullet } from "./BulletList";

type Props = {
  items: Bullet[];
  label?: string;
};

export function PrivacyDetails({ items, label = "How your data is used" }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-green-700 underline underline-offset-2 cursor-pointer"
      >
        {label}
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      {open && (
        <div className="mt-3 p-4 rounded-2xl bg-white border border-slate-400/20">
          <BulletList items={items} iconClassName="text-slate-700" />
        </div>
      )}
    </div>
  );
}
