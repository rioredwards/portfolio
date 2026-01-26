"use client";

import { parseFormErrors } from "@/lib/contact-validation";
import { useContactForm } from "@/lib/hooks/use-contact-form";
import { useContactFormValidation } from "@/lib/hooks/use-contact-form-validation";
import funComputerGraphic from "@/public/fun-computer-graphic.webp";
import Image from "next/image";
import { ContactSubmitButton } from "./contact-submit-button";
import { TestimonialsCarousel } from "./testimonials-carousel";
import { Alert } from "./ui/alert";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";

export function Contact() {
  const { form, state, action, isSuccess } = useContactForm();
  const { nameValidator, emailValidator, messageValidator } =
    useContactFormValidation(form);

  return (
    <div className="fade-in-scroll flex flex-col gap-12">
      {/* Contact form and illustration */}
      <div className="fade-in-scroll flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
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

        {/* Display success message */}
        {isSuccess && (
          <Alert
            variant="success"
            title="Success!"
            description="Your message has been sent. I'll get back to you soon!"
            className="flex-1"
          />
        )}

        {!isSuccess && (
          <form
            id="contact-form"
            suppressHydrationWarning={true}
            className="fade-in-scroll flex-1 space-y-8"
            action={action as never}
            onSubmit={async () => {
              await form.handleSubmit();
            }}
          >
            {/* Display server-side form errors */}
            {state &&
              typeof state === "object" &&
              parseFormErrors(state.errors).length > 0 && (
                <Alert
                  variant="destructive"
                  title="Validation Error"
                  description={
                    <>
                      {parseFormErrors(state.errors).map(
                        (errorMessage, index) => (
                          <p key={index}>{errorMessage}</p>
                        ),
                      )}
                    </>
                  }
                />
              )}
            {/* Display string errors (non-validation errors) */}
            {typeof state === "string" && (
              <Alert variant="destructive" title="Error" description={state} />
            )}
            <FieldGroup className="grid gap-x-4 gap-y-8 md:grid-cols-2">
              <form.Field
                name="name"
                validators={{
                  onBlur: ({ value: val }) =>
                    nameValidator({ val, caller: "onBlur" }),
                  onChange: ({ value: val }) =>
                    nameValidator({ val, caller: "onChange" }),
                }}
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel
                        className="text-secondary-foreground text-lg font-semibold"
                        style={{
                          fontFamily: "var(--font-mazaeni-demo), serif",
                        }}
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
                          errors={parseFormErrors(field.state.meta.errors).map(
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
                validators={{
                  onBlur: ({ value: val }) =>
                    emailValidator({ val, caller: "onBlur" }),
                  onChange: ({ value: val }) =>
                    emailValidator({ val, caller: "onChange" }),
                }}
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
                          errors={parseFormErrors(field.state.meta.errors).map(
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
                validators={{
                  onBlur: ({ value: val }) =>
                    messageValidator({ val, caller: "onBlur" }),
                  onChange: ({ value: val }) =>
                    messageValidator({ val, caller: "onChange" }),
                }}
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
                          errors={parseFormErrors(field.state.meta.errors).map(
                            (error) => ({ message: error }),
                          )}
                        />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
            <Field orientation="horizontal" className="flex justify-end gap-4">
              <form.Subscribe selector={(formState) => formState.canSubmit}>
                {(canSubmit) => (
                  <ContactSubmitButton
                    canSubmit={canSubmit}
                    success={isSuccess}
                  />
                )}
              </form.Subscribe>
            </Field>
          </form>
        )}
      </div>
      {/* Testimonials Carousel */}
      <div className="bg-background fade-in-scroll flex rounded-4xl px-4 py-12">
        <TestimonialsCarousel />
      </div>
    </div>
  );
}
