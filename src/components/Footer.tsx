import { Badge } from "./Badge";

type Props = {
  className?: string;
};

export function Footer({ className = "" }: Props) {
  return (
    <footer className={`w-full py-8 ${className}`}>
      <div className="mx-auto max-w-[1440px] px-16 flex items-center justify-center gap-3 flex-wrap">
        <Badge>Beta</Badge>
        <p className="text-xs font-medium text-slate-700">
          OpenUp AI is in beta and still learning. By using it, you accept{" "}
          <a href="#" className="underline underline-offset-2 hover:text-green-700">
            Our Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2 hover:text-green-700">
            Privacy Policy.
          </a>
        </p>
      </div>
    </footer>
  );
}
