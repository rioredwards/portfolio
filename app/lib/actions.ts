'use server';

import { sendEmail } from './email';
import { z } from 'zod';

const emailSchema = z.object({
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email.',
  }),
  message: z.string({
    invalid_type_error: 'Please enter a message.',
  }),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
};

export async function handleEmailSubmit(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = emailSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Send Email.',
    };
  }

  try {
    // Send email
    await sendEmail(validatedFields.data);
  } catch (error) {
    // return error message if email fails to send
    return {
      message: 'Failed to send email.',
    };
  }

  return {
    message: 'Email sent successfully.',
  };
}
