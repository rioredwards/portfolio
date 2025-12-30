import emailAction from "@/lib/actions";
import { emailFormOpts } from "@/lib/email-form-shared-code";
import {
  initialFormState,
  mergeForm,
  useForm,
  useTransform,
} from "@tanstack/react-form-nextjs";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

/**
 * Hook that manages the contact form state, validation, and submission
 */
export function useContactForm() {
  const [state, action] = useActionState(emailAction, initialFormState);

  const form = useForm({
    ...emailFormOpts,
    transform: useTransform(
      (baseForm) =>
        mergeForm(baseForm, state && typeof state === "object" ? state : {}),
      [state],
    ),
  });

  // Show toast notifications based on form state
  useEffect(() => {
    if (state === undefined && form.state.isSubmitted) {
      toast.success("Email sent successfully!");
      form.reset();
    } else if (typeof state === "string") {
      // Show error toast for non-validation errors (string errors)
      toast.error(state);
    }
  }, [state, form]);

  // Derive success state directly from state and form submission
  const isSuccess = state === undefined && form.state.isSubmitted;

  return {
    form,
    state,
    action,
    isSuccess,
  };
}
