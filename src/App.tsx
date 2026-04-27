import { BetaContent } from "./pages/BetaContent";
import { BetaOptInPage } from "./pages/BetaOptInPage";
import { ChatContent } from "./pages/ChatContent";
import { ChatDisclaimerPage } from "./pages/ChatDisclaimerPage";
import { CombinedOptInPage } from "./pages/CombinedOptInPage";
import { Landing } from "./pages/Landing";
import { MobileOptInPage } from "./pages/MobileOptInPage";
import AiGuideLoading from "./experiments/ai-guide-loading";

export default function App() {
  if (typeof window === "undefined") return <Landing />;
  const path = window.location.pathname;

  // Active experiments
  if (path === "/ai-guide-loading" || path.startsWith("/ai-guide-loading/")) {
    return <AiGuideLoading />;
  }

  // Legacy routes — kept reachable until migrated into experiments/
  if (path === "/content") return <BetaContent />;
  if (path === "/chat-content") return <ChatContent />;
  if (path === "/chat") return <ChatDisclaimerPage />;
  if (path === "/beta") return <BetaOptInPage />;
  if (path === "/combined") return <CombinedOptInPage />;
  if (path === "/mobile") return <MobileOptInPage />;

  return <Landing />;
}
