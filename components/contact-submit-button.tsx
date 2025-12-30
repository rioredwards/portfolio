"use client";

import { CheckCircle2Icon, Loader2Icon, SendIcon } from "lucide-react";
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
        <CheckCircle2Icon />
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
          <CheckCircle2Icon className="size-4 animate-pulse" />
          Success!
        </>
      ) : pending ? (
        <>
          <Loader2Icon className="size-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          <SendIcon className="size-4" />
          Send
        </>
      )}
    </Button>
  );
}
