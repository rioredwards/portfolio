"use server";

import { emailFormOpts } from "@/lib/email-form-shared-code";
import {
  ServerValidateError,
  createServerValidate,
} from "@tanstack/react-form-nextjs";
import { emailSchema } from "./dataTypes";
import { sendEmail } from "./email";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Create the server action that will infer the types of the form from `emailFormOpts`
const serverValidate = createServerValidate({
  ...emailFormOpts,
  onServerValidate: ({ value }) => {
    // Validate using Zod schema
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      // Return validation error - the form will handle displaying field errors
      return "Please check all fields and try again.";
    }
  },
});

export default async function emailAction(_: unknown, formData: FormData) {
  try {
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

    // Handle email sending errors
    // console.error("Email submission error:", e);

    // Re-throw the error - it will be caught by Next.js and shown to the user
    throw e;
  }
}
