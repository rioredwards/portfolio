/**
 * Contact form validation utilities
 */

export const validateEmail = (val: string): string | undefined => {
  if (!val || val.trim().length === 0) {
    return "Email is required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) {
    return "Please enter a valid email address.";
  }
  return undefined;
};

export const validateName = (val: string): string | undefined => {
  if (!val || val.trim().length === 0) {
    return "Name is required.";
  }
  return undefined;
};

export const validateMessage = (val: string): string | undefined => {
  if (!val || val.trim().length === 0) {
    return "Message is required.";
  }
  return undefined;
};

/**
 * Parses various error formats into an array of error messages
 */
export function parseFormErrors(errors: unknown): string[] {
  if (!errors) {
    return [];
  }
  if (typeof errors === "string") {
    return [errors];
  }

  if (
    typeof errors === "object" &&
    "message" in errors &&
    typeof errors.message === "string"
  ) {
    return [errors.message];
  }

  if (Array.isArray(errors)) {
    return errors
      .filter((e) => e != null)
      .map((e) => {
        if (typeof e === "string") {
          return e;
        }
        if (
          typeof e === "object" &&
          "message" in e &&
          typeof e.message === "string"
        ) {
          return e.message;
        }
        return null;
      })
      .filter((e): e is string => e !== null);
  }
  return ["An unknown error occurred. Please try again."];
}
