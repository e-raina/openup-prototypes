import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { MobileNav } from "../../components/MobileNav";
import { Navbar } from "../../components/Navbar";
import { USER_PROMPT } from "./fixtures";

type Props = {
  sent: boolean;
  topBar?: ReactNode;
  resetKey?: number;
  onSend: (text: string) => void;
  children: ReactNode;
};

export function ChatShell({ sent, topBar, resetKey = 0, onSend, children }: Props) {
  const [submittedPrompt, setSubmittedPrompt] = useState<string>("");
  const [input, setInput] = useState(USER_PROMPT);

  useEffect(() => {
    setInput(USER_PROMPT);
    setSubmittedPrompt("");
  }, [resetKey]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sent) return;
    setSubmittedPrompt(text);
    onSend(text);
  }

  const canSend = input.trim().length > 0 && !sent;

  return (
    <div className="flex min-h-screen flex-col bg-bg-lvl1">
      <div className="hidden md:block"><Navbar /></div>
      <div className="md:hidden"><MobileNav /></div>
      <div className="hidden md:block">{topBar}</div>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 pt-4">
        <div className="mx-auto flex w-full max-w-[559px] flex-1 flex-col gap-6">
          {/* Initial AI greeting — always present so the thread doesn't start cold */}
          <div className="flex justify-start">
            <p className="max-w-[80%] text-[15px] leading-[1.6] text-text-primary">
              Hi, what&rsquo;s on your mind today?
            </p>
          </div>

          {sent && (
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-lg rounded-br bg-bg-tag-blur px-3 py-2">
                <p className="text-[14px] text-text-primary">{submittedPrompt || USER_PROMPT}</p>
              </div>
            </div>
          )}

          <div className="flex-1">{children}</div>
        </div>
      </main>

      <div className="relative z-10 mx-auto flex w-full max-w-[751px] flex-col items-center px-4 pb-6">
        <form
          onSubmit={handleSubmit}
          className="group flex w-full items-center rounded-2xl border border-border-primary bg-bg-lvl3 px-6 py-4 shadow-lg focus-within:border-border-active"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How can I help you?"
            disabled={sent}
            className="flex-1 min-w-0 bg-transparent p-2 text-[14px] text-text-primary outline-none placeholder:text-text-secondary disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className={`flex size-10 items-center justify-center rounded-full shrink-0 transition-colors ${
              canSend
                ? "bg-button-primary-default hover:bg-button-primary-pressed"
                : "bg-graphic-disabled opacity-50 cursor-not-allowed"
            }`}
          >
            <ArrowUp className="size-5 text-icon-on-dark" strokeWidth={2} />
          </button>
        </form>
      </div>
    </div>
  );
}
