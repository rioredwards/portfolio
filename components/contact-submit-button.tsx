"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

/**
 * Submit button component that uses useFormStatus to track server action pending state
 * Must be inside the form element to work
 */
export function ContactSubmitButton({ canSubmit }: { canSubmit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={!canSubmit || pending}
      size="default"
      variant="default"
    >
      {pending ? "Sending..." : "Submit"}
    </Button>
  );
}
