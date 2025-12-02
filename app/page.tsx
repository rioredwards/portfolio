import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import { SkillSection } from "@/components/skill-section";
import { Code2, Database, LibraryBig, MessagesSquare } from "lucide-react";
import { SectionBreak } from "../components/section-break";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section id="home">
        <div className="section-content pt-24 pb-16 md:py-42 lg:py-48">
          <Hero
            title="Hello, I'm Rio."
            paragraphs={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commod repudiandae consequuntur voluptatum laborum.",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia...",
            ]}
            imageSrc="/profile.jpg"
            imageAlt="Rio"
          />
        </div>
      </section>
      <section id="projects">
        <SectionBreak orientation="left" height="tall">
          Projects
        </SectionBreak>
        <div className="section-content">
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
        </div>
        <SectionBreak orientation="right" height="short"></SectionBreak>
        <div className="section-content">
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
        </div>
        <SectionBreak orientation="left" height="short"></SectionBreak>
        <div className="section-content">
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
        </div>
      </section>
      <section id="skills">
        <SectionBreak orientation="left" height="tall">
          Skills
        </SectionBreak>
        <div className="section-content flex flex-col gap-12 py-12">
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
        </div>
      </section>
      <section id="blog">
        <SectionBreak orientation="right" height="tall">
          Blog
        </SectionBreak>
        <div className="section-content flex flex-col gap-12 py-12">
          <Blog
            title="Blog Title"
            description="Blog Description"
            icon={<MessagesSquare className="h-10 w-10" aria-hidden="true" />}
          />
          <Blog
            title="Blog Title"
            description="Blog Description"
            icon={<MessagesSquare className="h-10 w-10" aria-hidden="true" />}
          />
          <Blog
            title="Blog Title"
            description="Blog Description"
            icon={<MessagesSquare className="h-10 w-10" aria-hidden="true" />}
          />
        </div>
      </section>
      <section id="contact">
        <SectionBreak orientation="left" height="tall">
          Contact
        </SectionBreak>
        <div className="section-content">
          <Contact />
        </div>
      </section>
    </main>
  );
}
