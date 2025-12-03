import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
      {/* Left illustration placeholder and heading */}
      <div className="flex flex-1 flex-col items-center md:items-start">
        <div className="mb-6 h-64 w-64 rounded-3xl bg-secondary shadow-md" />
        <p
          className="text-3xl font-bold leading-tight text-secondary-foreground sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
          Nice to meet you!
        </p>
      </div>

      {/* Right form */}
      <form suppressHydrationWarning={true} className="flex flex-1 flex-col gap-6">
        {/* Name & Email row */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-lg font-semibold text-secondary-foreground"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
              Full Name
            </label>
            <input
              suppressHydrationWarning={true}
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Smith"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-secondary-foreground shadow-inner focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-lg font-semibold text-secondary-foreground"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
              Email
            </label>
            <input
              suppressHydrationWarning={true}
              id="email"
              name="email"
              type="email"
              placeholder="john@email.com"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-base text-secondary-foreground shadow-inner focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-lg font-semibold text-secondary-foreground"
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
            Message
          </label>
          <textarea
            suppressHydrationWarning={true}
            id="message"
            name="message"
            rows={6}
            placeholder="Let's chat!"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-secondary-foreground shadow-inner focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Submit button */}
        <div className="mt-4 flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="bg-primary text-lg font-bold text-primary-foreground">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
