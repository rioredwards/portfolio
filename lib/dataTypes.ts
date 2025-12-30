import { z } from "zod";

// Define the schema as the single source of truth
export const emailSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(200, "Name must be at most 200 characters."),
  email: z
    .email()
    .min(1, "Email is required.")
    .max(500, "Email must be at most 500 characters."),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(1000, "Message must be at most 1000 characters."),
});

// Infer the TypeScript type from the schema
export type EmailProps = z.infer<typeof emailSchema>;
