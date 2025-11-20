import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { SectionBreak } from "../components/section-break";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Sidebar />
      <div className="mx-auto w-full max-w-6xl px-4 pt-8">
        <div className="mb-12 flex justify-center">
          <Navbar />
        </div>
        <Hero
          title="Hello, I'm Rio."
          subheading="Lorem ipsum Maxime"
          paragraphs={[
            "Veritatis obcaecati tenetur iure eius earum ut molestias architecto...",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia...",
          ]}
          imageSrc="/profile.jpg"
          imageAlt="Rio"
        />
      </div>
      <SectionBreak orientation="left" height="tall">
        Projects
      </SectionBreak>
    </div>
  );
}
