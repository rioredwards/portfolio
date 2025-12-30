import {
  validateEmail,
  validateMessage,
  validateName,
} from "../contact-validation";
import type { EmailProps } from "../dataTypes";

type FieldName = keyof EmailProps;
type ValidationCaller = "onChange" | "onBlur";

/**
 * Hook that provides field validators with smart validation timing
 * - Validates on blur immediately
 * - Validates on change only after the field has been blurred at least once
 * - Clears errors on change after initial blur if the error is fixed
 */
export function useContactFormValidation(
  form: ReturnType<
    typeof import("@/lib/hooks/use-contact-form").useContactForm
  >["form"],
) {
  const createFieldValidator = (
    fieldName: FieldName,
    validateFn: (val: string) => string | undefined,
  ) => {
    return ({ val, caller }: { val: string; caller: ValidationCaller }) => {
      const fieldMeta = form.getFieldMeta(fieldName);
      const hasBeenBlurred = fieldMeta?.isBlurred;
      const hasErrorsFromOnBlur =
        (fieldMeta?.errorMap?.onBlur?.length ?? 0) > 0;

      // Prevent onChange validation before initial blur
      // This prevents showing errors immediately when user starts typing
      if (caller === "onChange" && !hasBeenBlurred) {
        return;
      }

      // After initial blur, clear onBlur errors on change so errors disappear
      // as soon as the user fixes them, not waiting for the next blur
      if (caller === "onChange" && hasErrorsFromOnBlur && fieldMeta) {
        form.setFieldMeta(fieldName, (prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            errorMap: { ...prev.errorMap, onBlur: undefined },
            errorSourceMap: { ...prev.errorSourceMap, onBlur: undefined },
          };
        });
      }

      return validateFn(val);
    };
  };

  return {
    nameValidator: createFieldValidator("name", validateName),
    emailValidator: createFieldValidator("email", validateEmail),
    messageValidator: createFieldValidator("message", validateMessage),
  };
}
