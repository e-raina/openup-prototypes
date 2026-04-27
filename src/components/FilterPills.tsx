type Pill = {
  label: string;
  active?: boolean;
};

type Props = {
  items: Pill[];
  onSelect?: (index: number) => void;
  className?: string;
};

export function FilterPills({ items, onSelect, className = "" }: Props) {
  return (
    <div
      className={`flex gap-2 overflow-x-auto no-scrollbar ${className}`}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect?.(i)}
          className={`shrink-0 px-3 py-2.5 rounded-pill text-sm font-semibold transition-colors cursor-pointer ${
            item.active
              ? "bg-slate-700 text-orange-100"
              : "bg-slate-200 text-slate-950"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
