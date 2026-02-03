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

    // throw Error("Test error");

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

    // Handle email sending errors with user-friendly messages
    let errorMessage = "Something went wrong. Please try again later.";

    if (e instanceof Error) {
      // Check for specific error types
      if (
        e.message.includes("ECONNECTION") ||
        e.message.includes("ETIMEDOUT") ||
        e.message.includes("ENOTFOUND") ||
        e.message.includes("fetch failed")
      ) {
        errorMessage =
          "Unable to connect. Please check your internet connection and try again.";
      } else if (
        e.message.includes("Invalid login") ||
        e.message.includes("credentials")
      ) {
        // Don't expose credential errors to users
        errorMessage =
          "The contact form is temporarily unavailable. Please email me directly.";
      } else if (e.message.includes("rate limit")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }
    }

    // Return error as string - will be handled by the frontend
    return errorMessage;
  }
}
