import { ArrowUp } from "lucide-react";
import type { FormEvent, InputHTMLAttributes } from "react";
import { useState } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onSubmit"> & {
  onSend?: (value: string) => void;
  helperText?: string;
};

export function ChatInput({
  placeholder = "Type your message",
  onSend,
  helperText = "Your conversation is private and never shared with your employer.",
  className = "",
  ...rest
}: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSend?.(value);
    setValue("");
  }

  const canSend = value.trim().length > 0;

  return (
    <div className={`flex flex-col items-center gap-2 w-full ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-white border border-slate-400/20 rounded-pill pl-5 pr-2 py-2 w-full shadow-[0_2px_12px_rgba(26,31,74,0.04)]"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent outline-none text-base font-medium text-slate-800 placeholder:text-slate-400 py-2"
          {...rest}
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className={`inline-flex items-center justify-center size-9 rounded-full transition-colors shrink-0 ${
            canSend
              ? "bg-green-500 text-white hover:bg-green-700"
              : "bg-green-500/30 text-white cursor-not-allowed"
          }`}
        >
          <ArrowUp className="size-5" strokeWidth={2.25} />
        </button>
      </form>
      {helperText && (
        <p className="text-xs font-medium text-slate-700">{helperText}</p>
      )}
    </div>
  );
}
