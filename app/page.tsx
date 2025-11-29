import { Blog } from "@/components/blog";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Project } from "@/components/project";
import { Sidebar } from "@/components/sidebar";
import { SkillSection } from "@/components/skill-section";
import { Code2, Database, LibraryBig, MessagesSquare } from "lucide-react";
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
      <Project
        category="Planning"
        title="Class TopBase"
        description="ClassTopBase is a school management software for after-schools. For this project, I designed a feature to help school owners plan their students' academic plans efficiently."
        skills={[
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
        ]}
        image="/temp-proj-photo.webp"
      />
      <SectionBreak orientation="right" height="short"></SectionBreak>
      <Project
        category="Planning"
        title="Class TopBase"
        description="ClassTopBase is a school management software for after-schools. For this project, I designed a feature to help school owners plan their students' academic plans efficiently."
        skills={[
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
        ]}
        image="/temp-proj-photo.webp"
      />
      <SectionBreak orientation="left" height="short"></SectionBreak>
      <Project
        category="Planning"
        title="Class TopBase"
        description="ClassTopBase is a school management software for after-schools. For this project, I designed a feature to help school owners plan their students' academic plans efficiently."
        skills={[
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
          "JavaScript",
        ]}
        image="/temp-proj-photo.webp"
      />
      <SectionBreak orientation="left" height="tall">
        Skills
      </SectionBreak>
      <SkillSection
        category="Languages"
        icon={<Code2 className="h-8 w-8" aria-hidden="true" />}
        skills={["TypeScript", "JavaScript", "HTML", "CSS", "SQL", "Python"]}
      />
      <SkillSection
        category="Libraries & Frameworks"
        icon={<LibraryBig className="h-8 w-8" aria-hidden="true" />}
        skills={["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "shadcn/ui"]}
      />
      <SkillSection
        category="Databases & Storage"
        icon={<Database className="h-8 w-8" aria-hidden="true" />}
        skills={["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis", "Supabase"]}
      />
      <SectionBreak orientation="right" height="tall">
        Blog
      </SectionBreak>
      <Blog
        title="Blog Title"
        description="Blog Description"
        icon={<MessagesSquare className="h-8 w-8" aria-hidden="true" />}
      />
    </div>
  );
}
