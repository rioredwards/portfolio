"use client";

import emailAction from "@/lib/actions";
import { emailFormOpts } from "@/lib/email-form-shared-code";
import funComputerGraphic from "@/public/fun-computer-graphic.webp";
import {
  initialFormState,
  mergeForm,
  useForm,
  useTransform,
} from "@tanstack/react-form-nextjs";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";

function errorParser(errors: unknown): string[] {
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
        let errorMessage = null;
        if (typeof e === "string") {
          errorMessage = e;
        } else if (
          typeof e === "object" &&
          "message" in e &&
          typeof e.message === "string"
        ) {
          errorMessage = e.message;
        }
        return errorMessage ? errorMessage : null;
      })
      .filter((e): e is string => e !== null);
  }
  return ["An unknown error occurred. Please try again."];
}

export function Contact() {
  const [state, action] = useActionState(emailAction, initialFormState);

  const form = useForm({
    ...emailFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state],
    ),
  });

  // Show toast notifications based on form state
  useEffect(() => {
    // When state is undefined, it means the form submitted successfully
    if (state === undefined && form.state.isSubmitted) {
      toast.success("Email sent successfully!");
      form.reset();
    }
  }, [state, form]);

  const nameFieldValidator = ({ value }: { value: string }) => {
    if (!value || value.trim().length === 0) {
      return "Name is required.";
    }
    return undefined;
  };

  const emailFieldValidator = ({ value }: { value: string }) => {
    if (!value || value.trim().length === 0) {
      return "Email is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
  };

  const messageFieldValidator = ({ value }: { value: string }) => {
    if (!value || value.trim().length === 0) {
      return "Message is required.";
    }
    return undefined;
  };

  // Submit button component that uses useFormStatus to track server action pending state
  // Must be inside the form element to work
  function SubmitButton({ canSubmit }: { canSubmit: boolean }) {
    const { pending } = useFormStatus();

    return (
      <Button
        type="submit"
        disabled={!canSubmit || pending}
        size="default"
        variant="default"
      >
        {pending ? "Sending..." : "Submit"}
      </Button>
    );
  }

  console.log("form.getAllErrors()", form.getAllErrors());

  return (
    <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
      {/* illustration placeholder and heading */}
      <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
        <Image
          src={funComputerGraphic}
          alt="Fun Computer Graphic"
          width={300}
          height={300}
        />
        <p
          className="text-foreground text-3xl leading-tight font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          Nice to meet you!
        </p>
      </div>

      {/* Right form */}
      <form
        id="contact-form"
        suppressHydrationWarning={true}
        className="flex-1 space-y-8"
        action={action as never}
        onSubmit={async () => {
          await form.handleSubmit();
        }}
      >
        <FieldGroup className="grid gap-x-4 gap-y-8 md:grid-cols-2">
          <form.Field
            name="name"
            validators={{ onChange: nameFieldValidator }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    className="text-secondary-foreground text-lg font-semibold"
                    style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
                    htmlFor={field.name}
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="John Smith"
                    autoComplete="name"
                    required
                  />
                  {isInvalid && (
                    <FieldError
                      errors={errorParser(field.state.meta.errors).map(
                        (error) => ({ message: error }),
                      )}
                    />
                  )}
                </Field>
              );
            }}
          />
          <form.Field
            name="email"
            validators={{ onChange: emailFieldValidator }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="email@example.com"
                    autoComplete="email"
                    type="email"
                    required
                  />
                  {isInvalid && (
                    <FieldError
                      errors={errorParser(field.state.meta.errors).map(
                        (error) => ({ message: error }),
                      )}
                    />
                  )}
                </Field>
              );
            }}
          />
          <form.Field
            name="message"
            validators={{ onChange: messageFieldValidator }}
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field className="md:col-span-2">
                  <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                  <InputGroup className="border-border max-h-64">
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Let's chat!"
                      rows={6}
                      aria-invalid={isInvalid}
                      required
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.state.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && (
                    <FieldError
                      errors={errorParser(field.state.meta.errors).map(
                        (error) => ({ message: error }),
                      )}
                    />
                  )}
                </Field>
              );
            }}
          />
        </FieldGroup>
        {errorParser(state?.errors).map((errorMessage) => (
          <FieldError key={errorMessage} errors={[{ message: errorMessage }]} />
        ))}
        <Field orientation="horizontal" className="flex justify-end gap-4">
          <form.Subscribe selector={(formState) => formState.canSubmit}>
            {(canSubmit) => <SubmitButton canSubmit={canSubmit} />}
          </form.Subscribe>
        </Field>
      </form>
    </div>
  );
}
