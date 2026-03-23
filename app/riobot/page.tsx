import { RioBotChatPanel } from "@/components/interview-bot/RioBotChatPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RioBot",
  description: "Ask RioBot anything about Rio Edwards — his work, tech stack, and projects.",
};

export default function RioBotPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh flex-col items-center justify-center px-4 py-12"
    >
      <div className="flex h-[min(36rem,calc(100dvh-8rem))] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border/60 bg-background shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)]">
        <RioBotChatPanel className="flex-1" />
      </div>
    </main>
  );
}
