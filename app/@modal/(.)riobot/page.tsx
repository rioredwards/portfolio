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
        className="flex h-[min(36rem,calc(100dvh-4rem))] w-full max-w-[calc(100%-4rem)] sm:max-w-lg flex-col gap-0 overflow-hidden rounded-xl p-0 top-1/2 -translate-y-1/2"
      >
        <DialogTitle className="sr-only">RioBot Chat</DialogTitle>
        <RioBotChatPanel onClose={handleClose} className="flex-1" />
      </DialogContent>
    </Dialog>
  );
}
