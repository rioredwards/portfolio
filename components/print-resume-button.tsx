"use client";

import { Button } from "@/components/ui/button";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function PrintResumeButton({ filename }: { filename: string }) {
  function handlePrint() {
    const prev = document.title;
    document.title = filename;
    window.print();
    document.title = prev;
  }

  return (
    <Button id="print-resume-button" onClick={handlePrint} size="lg">
      <HugeiconsIcon
        icon={Download04Icon}
        size={16}
        color="currentColor"
        strokeWidth={2}
      />
      Download PDF
    </Button>
  );
}
