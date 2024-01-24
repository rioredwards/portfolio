'use server';

import { sendEmail } from './email';
import { z } from 'zod';

// None can be empty
const emailSchema = z.object({
  name: z.string().min(1, {
    message: 'Please enter your name.',
  }),
  email: z.string().email({
    message: 'Please enter your email address.',
  }),
  message: z.string().min(1, {
    message: 'Please enter a message.',
  }),
});

export type State = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    other?: string[];
  };
  message?: string | null;
};

export async function handleEmailSubmit(_: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = emailSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Send Email.',
    };
  }

  try {
    // Send email
    await sendEmail(validatedFields.data);
  } catch (error: any) {
    // return error message if email fails to send
    return {
      success: false,
      errors: {
        other: [error.message],
      },
      message: 'Failed to send email.',
    };
  }

  return {
    success: true,
    message: 'Email sent successfully.',
  };
}
