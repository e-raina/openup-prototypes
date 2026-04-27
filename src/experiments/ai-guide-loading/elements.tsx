import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { LoaderAvatar } from "./LoaderAvatar";

export function Ellipsis() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= 3 ? 1 : c + 1));
    }, 400);
    return () => clearInterval(id);
  }, []);
  return <span>{".".repeat(count)}</span>;
}

function CyclingLabel({ text }: { text: string }) {
  const match = text.match(/^(.*?)\.{2,}$/);
  if (match) {
    return (
      <>
        {match[1]}
        <Ellipsis />
      </>
    );
  }
  return <>{text}</>;
}

type LoadingRowProps = {
  label: ReactNode;
  breathing?: boolean;
};

export function LoadingRow({ label, breathing = false }: LoadingRowProps) {
  return (
    <div className="flex items-center gap-3">
      <LoaderAvatar breathing={breathing} loading />
      {/* Loader-active blue is not in OpenUp DS yet — proposed new alias. */}
      <div className="text-[12px] font-semibold text-[var(--color-loader-active-blue)]">
        {typeof label === "string" ? <CyclingLabel text={label} /> : label}
      </div>
    </div>
  );
}

export function ResponseBlock({ children }: { children: ReactNode }) {
  return (
    <div className="speedlab-fade-in">
      <p className="max-w-full text-[15px] leading-[1.6] text-text-primary">
        {children}
      </p>
    </div>
  );
}
