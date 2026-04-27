import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function SearchInput({ placeholder = "Search...", className = "", ...rest }: Props) {
  return (
    <div
      className={`flex items-center gap-2 bg-orange-100 rounded-pill px-4 py-3 ${className}`}
    >
      <Search className="size-5 text-slate-400 shrink-0" strokeWidth={2} />
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-base font-medium text-slate-800 placeholder:text-slate-400"
        {...rest}
      />
    </div>
  );
}
