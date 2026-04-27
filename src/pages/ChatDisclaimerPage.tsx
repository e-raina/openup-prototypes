import {
  CheckCircle2,
  Layers,
  Lock,
  LogOut,
  MessageCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "../components/Button";
import { ChatInput } from "../components/ChatInput";
import { DisclaimerCard } from "../components/DisclaimerCard";
import { Navbar } from "../components/Navbar";
import type { Bullet } from "../components/BulletList";

const disclaimerItems: Bullet[] = [
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

export function ChatDisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50 relative">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-between px-6 pt-10 pb-8 gap-8">
        <div className="flex-1 flex items-center justify-center w-full">
          <DisclaimerCard
            className="w-full max-w-[480px]"
            title="A quick note before we begin"
            items={disclaimerItems}
            action={<Button>Acknowledge and start chat</Button>}
          />
        </div>

        <div className="w-full max-w-[720px]">
          <ChatInput />
        </div>
      </main>

      <div className="absolute bottom-6 right-6">
        <Button variant="danger" size="sm" leadingIcon={<LogOut className="size-4" />}>
          End session
        </Button>
      </div>
    </div>
  );
}
