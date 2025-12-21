import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import { SlidePanel } from "@/components/slide-panel";
import profileImage from "@/public/profile.webp";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section id="home">
        <div className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center px-4 pt-24 pb-24 md:px-20">
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
      <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
        <SectionHeader title="Projects" />
      </SlidePanel>
      <SlidePanel orientation="left" decorationHeight="tall" fill="background">
        <div className="md:py-2 lg:py-4">
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
      </SlidePanel>
      <SlidePanel
        orientation="right"
        decorationHeight="short"
        fill="secondary"
      ></SlidePanel>
      <SlidePanel orientation="right" decorationHeight="tall" fill="background">
        <div className="md:py-2 lg:py-4">
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
      </SlidePanel>
      <SlidePanel
        orientation="right"
        decorationHeight="short"
        fill="secondary"
      ></SlidePanel>
      <SlidePanel orientation="right" decorationHeight="tall" fill="background">
        <div className="md:py-2 lg:py-4">
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
      </SlidePanel>
      <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
        <SectionHeader title="Blog" />
      </SlidePanel>
      <SlidePanel orientation="left" decorationHeight="tall" fill="background">
        <div className="flex flex-col gap-12 px-4 py-12">
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
      </SlidePanel>
      <SlidePanel orientation="right" decorationHeight="tall" fill="secondary">
        <SectionHeader title="Contact" />
      </SlidePanel>
      <SlidePanel orientation="right" decorationHeight="tall" fill="background">
        <div className="pt-24 pb-12 lg:pb-16">
          <Contact />
        </div>
      </SlidePanel>
    </main>
  );
}
