import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import { SectionContentWrapper } from "@/components/sectionContentWrapper";
import { SlidePanel } from "@/components/slide-panel";
import profileImage from "@/public/profile.webp";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { PanelStack } from "../components/panel-stack";
import { SectionHeader } from "../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section id="home">
        <div className="max-w-content-max-w px-content-px md:px-content-px-md py-content-py mx-auto grid min-h-screen place-items-center">
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
      <PanelStack>
        <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
          <SectionHeader title="Projects" />
        </SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="background"
        >
          <SectionContentWrapper>
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
          </SectionContentWrapper>
        </SlidePanel>
        <SlidePanel
          orientation="right"
          decorationHeight="short"
          fill="secondary"
        ></SlidePanel>
        <SlidePanel
          orientation="right"
          decorationHeight="short"
          fill="background"
        >
          <SectionContentWrapper>
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
          </SectionContentWrapper>
        </SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="short"
          fill="secondary"
        ></SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="short"
          fill="background"
        >
          <SectionContentWrapper>
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
          </SectionContentWrapper>
        </SlidePanel>
        <SlidePanel
          orientation="right"
          decorationHeight="tall"
          fill="secondary"
        >
          <SectionHeader title="Blog" />
        </SlidePanel>
        <SlidePanel
          orientation="right"
          decorationHeight="tall"
          fill="background"
        >
          <SectionContentWrapper>
            <div className="flex flex-col gap-12">
              <Blog
                title="Blog Title"
                description="Blog Description"
                icon={
                  <MessagesSquare className="h-10 w-10" aria-hidden="true" />
                }
              />
              <Blog
                title="Blog Title"
                description="Blog Description"
                icon={
                  <MessagesSquare className="h-10 w-10" aria-hidden="true" />
                }
              />
              <Blog
                title="Blog Title"
                description="Blog Description"
                icon={
                  <MessagesSquare className="h-10 w-10" aria-hidden="true" />
                }
              />
            </div>
          </SectionContentWrapper>
        </SlidePanel>
        <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
          <SectionHeader title="Contact" />
        </SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="background"
        >
          <SectionContentWrapper>
            <Contact />
          </SectionContentWrapper>
        </SlidePanel>
      </PanelStack>
    </main>
  );
}
