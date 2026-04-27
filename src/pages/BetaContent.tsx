import { BookOpen, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Callout } from "../components/Callout";
import { FeatureList, type Feature } from "../components/FeatureList";
import { Footer } from "../components/Footer";

const features: Feature[] = [
  {
    icon: MessageCircle,
    title: "Talk through what's on your mind",
    description: "Get supportive guidance for stress, sleep, and more",
  },
  {
    icon: Users,
    title: "Find the right expert for you",
    description: "Get matched with professionals who fit your needs",
  },
  {
    icon: BookOpen,
    title: "Explore curated content",
    description: "Articles, exercises, and resources tailored to you",
  },
];

export function BetaContent() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-1 flex justify-center px-6 pt-16 pb-12">
        <div className="w-full max-w-[480px] flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <Badge size="md">Beta Preview</Badge>
            <h1 className="text-4xl font-semibold text-slate-900 text-center tracking-tight">
              Meet your AI Guide
            </h1>
          </div>

          <FeatureList features={features} className="w-full" />

          <Callout icon={ShieldCheck} tone="success" className="w-full">
            This is an early preview. Your AI Guide is still learning and improving.
            Responses are not a substitute for professional advice.
          </Callout>

          <div className="flex flex-col items-center gap-4 mt-2">
            <Button>Join the Beta</Button>
            <a
              href="#"
              className="text-sm font-medium text-slate-800 underline underline-offset-2 hover:text-green-700"
            >
              Learn more about what to expect
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
