"use client";

import { BubbleChatIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function InterviewBot() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isOnRiobotPage = pathname === "/riobot";

  useEffect(() => {
    function handleMobileMenuState(event: Event) {
      const customEvent = event as CustomEvent<{ open: boolean }>;
      const nextOpen = Boolean(customEvent.detail?.open);
      setIsMobileMenuOpen(nextOpen);
    }

    window.addEventListener("mobile-menu:open-change", handleMobileMenuState);
    return () => {
      window.removeEventListener(
        "mobile-menu:open-change",
        handleMobileMenuState,
      );
    };
  }, []);

  function handleOpen() {
    window.dispatchEvent(
      new CustomEvent("interview-bot:open-change", {
        detail: { open: true },
      }),
    );
    router.push("/riobot");
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          isOnRiobotPage && "hidden",
          isMobileMenuOpen && !isOnRiobotPage && "hidden md:block",
        )}
      >
        <Button
          size="icon-xl"
          onClick={handleOpen}
          className="rounded-2xl bg-primary shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-shadow hover:shadow-[0_6px_28px_-4px_rgba(0,0,0,0.25)]"
          aria-label="Open RioBot"
        >
          <HugeiconsIcon
            icon={BubbleChatIcon}
            size={24}
            className="size-5"
            color="currentColor"
            strokeWidth={2}
          />
        </Button>
      </motion.div>
    </div>
  );
}
