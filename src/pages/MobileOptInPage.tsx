import { Brain, History, Lock } from "lucide-react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { FilterPills } from "../components/FilterPills";
import { MobileNav } from "../components/MobileNav";
import type { ReactNode } from "react";

const chatPreviewUrl =
  "https://www.figma.com/api/mcp/asset/20996c56-f578-4585-96e1-b26f118a934d";

type InfoItem = { icon: ReactNode; content: ReactNode };

const infoItems: InfoItem[] = [
  {
    icon: <Lock className="size-5 text-green-700 shrink-0 mt-0.5" strokeWidth={1.75} />,
    content: (
      <>
        <strong>Your conversations are 100% private;</strong>{" "}
        your employer never sees them
      </>
    ),
  },
  {
    icon: <Brain className="size-5 text-green-700 shrink-0 mt-0.5" strokeWidth={1.75} />,
    content: (
      <>
        <strong>Built to help you think,</strong> not to replace your therapist
      </>
    ),
  },
  {
    icon: <History className="size-5 text-green-700 shrink-0 mt-0.5" strokeWidth={1.75} />,
    content: (
      <>
        <strong>We may use past chats</strong> to give you more relevant support
      </>
    ),
  },
];

const filters = [
  { label: "Get something off my chest", active: true },
  { label: "Find the right expert", active: false },
  { label: "Explore curated content", active: false },
];

export function MobileOptInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50 max-w-[393px] mx-auto">
      <MobileNav />

      <main className="flex-1 flex flex-col items-center px-5 pt-10 pb-12 gap-12">
        {/* Hero + Privacy + CTA */}
        <section className="flex flex-col items-center gap-8 w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge size="sm">Beta</Badge>
            <h1 className="font-serif font-black text-[22px] leading-[1.2] tracking-[-0.6px] text-slate-900">
              Meet AI Guide,
              <br />
              your self-reflection partner towards clarity
            </h1>
            <p className="text-sm font-medium text-slate-800 leading-snug">
              Co-designed with psychologists who put your safety first.
            </p>
          </div>

          <div className="w-full bg-orange-100 border border-orange-200 rounded-2xl px-4 py-1">
            {infoItems.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 py-3.5 ${
                  i < infoItems.length - 1 ? "border-b border-orange-200" : ""
                }`}
              >
                {item.icon}
                <p className="text-sm font-medium text-slate-800 leading-snug flex-1">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-sm font-medium text-slate-800 text-center leading-snug">
              AI Guide is in <strong>beta</strong> preview and{" "}
              <strong>still learning.</strong>
              <br />
              By continuing, you accept{" "}
              <a href="#" className="underline underline-offset-2">
                Our Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2">
                Privacy Policy
              </a>
              .
            </p>
            <Button size="md" className="w-full">
              Acknowledge and start chat
            </Button>
          </div>
        </section>

        {/* See it in action */}
        <section className="flex flex-col items-center gap-8 w-full">
          <h2 className="font-serif font-black text-[22px] leading-[1.2] tracking-[-0.6px] text-slate-900 text-center">
            See it in action
          </h2>

          <div className="w-full flex flex-col items-center gap-10">
            <FilterPills items={filters} className="w-full px-0" />

            <div className="w-full rounded-[20px] border border-black/[0.06] overflow-hidden aspect-[4/3]">
              <img
                alt="AI Guide chat preview"
                className="size-full object-cover"
                src={chatPreviewUrl}
              />
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-sm font-medium text-slate-800 text-center leading-snug">
                By using it, you accept{" "}
                <a href="#" className="underline underline-offset-2">
                  Our Terms
                </a>{" "}
                and{" "}
                <a href="#" className="underline underline-offset-2">
                  Privacy Policy
                </a>
                .
              </p>
              <Button size="md" className="w-full">
                Start my conversation →
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
