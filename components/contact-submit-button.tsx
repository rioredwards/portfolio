"use client";

import {
  CheckmarkCircle02Icon,
  Rotate01Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

/**
 * Submit button component that uses useFormStatus to track server action pending state
 * Must be inside the form element to work
 */
export function ContactSubmitButton({
  canSubmit,
  success,
}: {
  canSubmit: boolean;
  success: boolean;
}) {
  const { pending } = useFormStatus();

  if (success) {
    return (
      <Button type="submit" disabled={true} size="default" variant="default">
        <HugeiconsIcon
          icon={CheckmarkCircle02Icon}
          size={16}
          color="currentColor"
          strokeWidth={1.8}
        />
        Success!
      </Button>
    );
  }

  return (
    <Button
      type="submit"
      disabled={!canSubmit || pending || success}
      size="default"
      variant="default"
    >
      {success ? (
        <>
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
            className="animate-pulse"
          />
          Success!
        </>
      ) : pending ? (
        <>
          <HugeiconsIcon
            icon={Rotate01Icon}
            size={16}
            color="currentColor"
            strokeWidth={2}
            className="animate-spin"
          />
          Sending...
        </>
      ) : (
        <>
          <HugeiconsIcon
            icon={SentIcon}
            size={16}
            color="currentColor"
            strokeWidth={2}
          />
          Send
        </>
      )}
    </Button>
  );
}
