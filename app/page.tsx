import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import profileImage from "@/public/profile.webp";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { SectionBreak } from "../components/section-break";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section id="home">
        <div className="section-content pt-24 pb-16 md:pt-48 md:pb-40">
          <Hero
            title="Hello, I'm Rio."
            paragraphs={[
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commod repudiandae consequuntur voluptatum laborum.",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia...",
            ]}
            image={
              <Image
                src={profileImage}
                alt="Rio Edwards"
                fill
                className="object-cover"
                priority
              />
            }
          />
        </div>
      </section>
      <section id="projects">
        <SectionBreak orientation="left" height="tall">
          Projects
        </SectionBreak>
        <div className="section-content py-12 md:py-16 lg:py-32">
          <Project
            orientation="left"
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
        <div className="section-content py-12 md:py-16 lg:py-32">
          <Project
            orientation="right"
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
        <div className="section-content py-12 md:py-16 lg:py-32">
          <Project
            orientation="left"
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
        <div className="section-content lg:py-32">
          <Contact />
        </div>
      </section>
    </main>
  );
}
