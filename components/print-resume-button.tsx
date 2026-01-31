"use client";

import { Button } from "@/components/ui/button";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function PrintResumeButton() {
  return (
    <Button onClick={() => window.print()} size="lg">
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
