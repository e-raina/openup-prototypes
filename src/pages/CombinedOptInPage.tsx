import {
  BookOpen,
  CheckCircle2,
  EyeOff,
  Layers,
  Lock,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "../components/Badge";
import { BulletList, type Bullet } from "../components/BulletList";
import { Button } from "../components/Button";
import { FeatureList, type Feature } from "../components/FeatureList";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PrivacyDetails } from "../components/PrivacyDetails";

const benefits: Feature[] = [
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

const goodToKnow: Bullet[] = [
  {
    icon: ShieldCheck,
    text: (
      <>
        <strong className="font-semibold">Not a therapist</strong> — a
        self-reflection partner built with clinical oversight.
      </>
    ),
  },
  {
    icon: EyeOff,
    text: (
      <>
        <strong className="font-semibold">Private by default</strong> — your
        employer can never see these conversations.
      </>
    ),
  },
  {
    icon: CheckCircle2,
    text: (
      <>
        <strong className="font-semibold">Still in beta</strong> — responses
        aren't a substitute for professional advice.
      </>
    ),
  },
];

const fullPrivacyDetail: Bullet[] = [
  { icon: Layers, text: "This AI Guide is a self-reflection partner, not a therapist." },
  { icon: CheckCircle2, text: "It helps you gain clarity and decide your next step." },
  {
    icon: Users,
    text: "It may suggest speaking with one of our certified experts when helpful.",
  },
  { icon: ShieldCheck, text: "Built with clinical oversight and designed to be safe." },
  {
    icon: MessageCircle,
    text: "OpenUp may refer to your past chats to guide you toward helpful next steps. Your conversations stay 100% private.",
  },
  { icon: Lock, text: "Your employer can never see these conversations." },
];

export function CombinedOptInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <Navbar />

      <main className="flex-1 flex justify-center px-6 pt-14 pb-12">
        <div className="w-full max-w-[520px] flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <Badge size="md">Beta Preview</Badge>
            <h1 className="text-4xl font-semibold text-slate-900 text-center tracking-tight">
              Meet your AI Guide
            </h1>
            <p className="text-base font-medium text-slate-700 text-center max-w-[420px]">
              A private space to talk things through, gain clarity, and find the
              right next step.
            </p>
          </div>

          <section className="w-full flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider px-1">
              What it does
            </h2>
            <FeatureList features={benefits} />
          </section>

          <section className="w-full flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wider px-1">
              Good to know
            </h2>
            <div className="bg-green-50 rounded-2xl px-5 py-4">
              <BulletList items={goodToKnow} />
            </div>
            <div className="px-1 pt-1">
              <PrivacyDetails items={fullPrivacyDetail} />
            </div>
          </section>

          <div className="flex flex-col items-center gap-3 mt-2 w-full">
            <Button className="w-full sm:w-auto">Start chatting</Button>
            <p className="text-xs font-medium text-slate-700 text-center">
              By starting, you accept our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-green-700">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-green-700">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
