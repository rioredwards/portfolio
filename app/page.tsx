import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import profileImage from "@/public/profile.webp";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { MainSection } from "../components/main-section";
import { SectionHeader } from "../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section id="home">
        <div className="mx-auto max-w-6xl pt-24 pb-56 md:px-20 md:pt-48 md:pb-64">
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
      <MainSection
        id="projects"
        orientation="left"
        height="tall"
        fill="secondary"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[200px]"
      >
        <SectionHeader title="Projects" />
      </MainSection>
      <MainSection
        orientation="left"
        height="tall"
        fill="background"
        topMargin="-mt-[240px]"
        bottomPadding="pb-[260px]"
        className="pt-16"
      >
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
      </MainSection>
      <MainSection
        orientation="right"
        height="short"
        fill="secondary"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[200px]"
      ></MainSection>
      <MainSection
        orientation="right"
        height="tall"
        fill="background"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[260px]"
        className="pt-16"
      >
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
      </MainSection>
      <MainSection
        orientation="right"
        height="short"
        fill="secondary"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[200px]"
      ></MainSection>
      <MainSection
        orientation="right"
        height="tall"
        fill="background"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[260px]"
        className="pt-16"
      >
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
      </MainSection>
      <MainSection
        orientation="left"
        height="short"
        fill="secondary"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[200px]"
      ></MainSection>
      <MainSection
        orientation="left"
        height="tall"
        fill="secondary"
        topMargin="-mt-[240px]"
        bottomPadding="pb-[200px]"
      >
        <SectionHeader title="Blog" />
      </MainSection>
      <MainSection
        orientation="left"
        height="tall"
        fill="background"
        topMargin="-mt-[240px]"
        bottomPadding="pb-[200px]"
      >
        <div className="flex flex-col gap-12 py-12">
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
      </MainSection>
      <MainSection
        id="contact"
        orientation="right"
        height="tall"
        fill="secondary"
        topMargin="-mt-[200px]"
        bottomPadding="pb-[200px]"
      >
        <SectionHeader title="Contact" />
      </MainSection>
      <MainSection
        orientation="right"
        height="tall"
        fill="background"
        topMargin="-mt-[240px]"
        bottomPadding="pb-[200px]"
      >
        <div className="py-16 lg:py-32">
          <Contact />
        </div>
      </MainSection>
    </main>
  );
}
