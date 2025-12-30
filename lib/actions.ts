"use server";

import { emailFormOpts } from "@/lib/email-form-shared-code";
import {
  ServerFormState,
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";
import { emailSchema } from "./dataTypes";
import { sendEmail } from "./email";

// Create the server action that will infer the types of the form from `emailFormOpts`
const serverValidate = createServerValidate({
  ...emailFormOpts,
  onServerValidate: ({ value }) => {
    // Validate using Zod schema
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      // Map Zod field errors to form field errors
      const fieldErrors: Record<string, string[]> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (field) {
          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }
          fieldErrors[field].push(issue.message);
        }
      });

      // Return field-specific errors
      return fieldErrors;
    }
  },
});

export default async function emailAction(
  _: unknown,
  formData: FormData,
): Promise<
  ServerFormState<typeof emailFormOpts, undefined> | undefined | string
> {
  try {
    const validatedData = await serverValidate(formData);

    throw Error("Test error");

    // Send email
    await sendEmail(validatedData);

    // Return undefined on success - form will reset
    return undefined;
  } catch (e) {
    console.error("Error:", e);
    if (e instanceof ServerValidateError) {
      // Return the form state with validation errors
      return e.formState;
    }

    // Handle email sending errors
    // Convert error to a user-friendly message
    const errorMessage = "An unknown error occurred.";

    // Return error as string - will be handled by the frontend
    return errorMessage;
  }
}
