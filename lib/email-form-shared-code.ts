import { formOptions } from "@tanstack/react-form-nextjs";

export const emailFormOpts = formOptions({
  defaultValues: {
    name: "",
    email: "",
    message: "",
  },
});
