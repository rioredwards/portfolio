import { Button } from "@/components/ui/button";
import funComputerGraphic from "@/public/fun-computer-graphic.webp";
import Image from "next/image";

export function Contact() {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
      {/* Left illustration placeholder and heading */}
      <div className="flex flex-1 flex-col items-center gap-4">
        <Image
          src={funComputerGraphic}
          alt="Fun Computer Graphic"
          width={300}
          height={300}
        />
        <h2 className="title-2-text">Nice to meet you!</h2>
      </div>

      {/* Right form */}
      <form
        suppressHydrationWarning={true}
        className="flex flex-1 flex-col gap-6"
      >
        {/* Name & Email row */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="label-text">
              Full Name
            </label>
            <input
              suppressHydrationWarning={true}
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Smith"
              className="border-border bg-background focus:ring-ring w-full rounded-(--radius-input) border px-4 py-3 shadow-inner focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-text">
              Email
            </label>
            <input
              suppressHydrationWarning={true}
              id="email"
              name="email"
              type="email"
              placeholder="john@email.com"
              className="border-border bg-background focus:ring-ring w-full rounded-(--radius-input) border px-4 py-3 shadow-inner focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="label-text">
            Message
          </label>
          <textarea
            suppressHydrationWarning={true}
            id="message"
            name="message"
            rows={6}
            placeholder="Let's chat!"
            className="border-border bg-background focus:ring-ring w-full rounded-(--radius-input) border px-4 py-3 shadow-inner focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Submit button */}
        <div className="mt-4 flex justify-end">
          <Button type="submit" size="default">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
