import { Button } from "@/components/ui/button";
import funComputerGraphic from "@/public/fun-computer-graphic.webp";
import Image from "next/image";

export function Contact() {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
      {/* Left illustration placeholder and heading */}
      <div className="flex flex-1 flex-col items-center gap-4 md:items-start">
        <Image
          src={funComputerGraphic}
          alt="Fun Computer Graphic"
          width={300}
          height={300}
        />
        <p
          className="text-secondary-foreground text-3xl leading-tight font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          Nice to meet you!
        </p>
      </div>

      {/* Right form */}
      <form
        suppressHydrationWarning={true}
        className="flex flex-1 flex-col gap-6"
      >
        {/* Name & Email row */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-secondary-foreground text-lg font-semibold"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              Full Name
            </label>
            <input
              suppressHydrationWarning={true}
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Smith"
              className="border-border bg-background text-secondary-foreground focus:ring-ring w-full rounded-2xl border px-4 py-3 text-base shadow-inner focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-secondary-foreground text-lg font-semibold"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              Email
            </label>
            <input
              suppressHydrationWarning={true}
              id="email"
              name="email"
              type="email"
              placeholder="john@email.com"
              className="border-border bg-background text-secondary-foreground focus:ring-ring w-full rounded-2xl border px-4 py-3 text-base shadow-inner focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-secondary-foreground text-lg font-semibold"
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
          >
            Message
          </label>
          <textarea
            suppressHydrationWarning={true}
            id="message"
            name="message"
            rows={6}
            placeholder="Let's chat!"
            className="border-border bg-background text-secondary-foreground focus:ring-ring w-full rounded-lg border px-4 py-3 text-base shadow-inner focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Submit button */}
        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="bg-primary text-primary-foreground text-lg font-bold"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
