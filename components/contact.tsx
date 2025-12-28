"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import funComputerGraphic from "@/public/fun-computer-graphic.webp";
import Image from "next/image";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";

const formSchema = z.object({
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
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message must be at most 1000 characters."),
});

export function Contact() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      toast.success("Form submitted successfully");
    },
  });

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
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="John Smith"
                    autoComplete="name"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="email"
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
                    placeholder="John Smith"
                    autoComplete="email"
                    type="email"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="message"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field>
                  <FieldLabel htmlFor={field.name}>Message</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Let's chat!"
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={isInvalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.state.value.length}/100 characters
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="contact-form">
            Submit
          </Button>
        </Field>
      </form>
    </div>
  );
}
