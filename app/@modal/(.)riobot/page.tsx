"use client";

import { RioBotChatPanel } from "@/components/interview-bot/RioBotChatPanel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export default function RioBotModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="top-1/2 flex h-[min(36rem,calc(100dvh-4rem))] w-full max-w-[calc(100%-4rem)] -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-xl p-0 sm:max-w-lg"
      >
        <DialogTitle className="sr-only">RioBot Chat</DialogTitle>
        <RioBotChatPanel onClose={handleClose} className="flex-1" />
      </DialogContent>
    </Dialog>
  );
}
