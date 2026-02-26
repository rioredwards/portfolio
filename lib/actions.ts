"use server";

import { emailFormOpts } from "@/lib/email-form-shared-code";
import {
  ServerFormState,
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";
import { emailSchema } from "./dataTypes";
import { sendEmail } from "./email";

const ERROR_MESSAGES = {
  generic: "Something went wrong. Please try again later.",
  connection:
    "Unable to connect. Please check your internet connection and try again.",
  unavailable:
    "The contact form is temporarily unavailable. Please email me directly.",
  rateLimit: "Too many requests. Please wait a moment and try again.",
} as const;

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
        const raw = issue.path[0];
        const field = typeof raw === "string" ? raw : undefined;
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
    // Check honeypot field - if filled, silently reject (likely a bot)
    const honeypot = formData.get("website");
    if (honeypot && typeof honeypot === "string" && honeypot.length > 0) {
      // Return success to not tip off the bot, but don't send email
      return undefined;
    }

    const validatedData = await serverValidate(formData);

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
    let errorMessage: string = ERROR_MESSAGES.generic;

    if (e instanceof Error) {
      if (
        e.message.includes("ECONNECTION") ||
        e.message.includes("ETIMEDOUT") ||
        e.message.includes("ENOTFOUND") ||
        e.message.includes("fetch failed")
      ) {
        errorMessage = ERROR_MESSAGES.connection;
      } else if (
        e.message.includes("Invalid login") ||
        e.message.includes("credentials")
      ) {
        errorMessage = ERROR_MESSAGES.unavailable;
      } else if (e.message.includes("rate limit")) {
        errorMessage = ERROR_MESSAGES.rateLimit;
      }
    }

    // Return error as string - will be handled by the frontend
    return errorMessage;
  }
}
