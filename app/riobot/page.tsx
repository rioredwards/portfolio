import { RioBotChatPanel } from "@/components/interview-bot/RioBotChatPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RioBot",
  description: "Ask RioBot anything about Rio Edwards — his work, tech stack, and projects.",
};

export default function RioBotPage() {
  return (
    <main id="main-content" className="flex h-dvh flex-col bg-background">
      <RioBotChatPanel variant="full" className="flex-1" />
    </main>
  );
}
