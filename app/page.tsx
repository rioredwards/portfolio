import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-4xl px-4 pt-8">
        <Navbar />
        <Hero
          title="Welcome"
          subtitle="Portfolio"
          description="A simple, elegant hero section ready for customization."
        />
      </div>
    </div>
  );
}
