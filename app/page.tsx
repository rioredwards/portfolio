import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import { SectionContentWrapper } from "@/components/section-content-wrapper";
import { SlidePanel } from "@/components/slide-panel";
import profileImage from "@/public/profile.webp";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section id="home">
        <SectionContentWrapper className="py-0!">
          <Hero
            title="Hello, I'm Rio."
            paragraphs={[
              "I'm a detail-oriented software engineer dedicated to building products users value and enjoy.",
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
        </SectionContentWrapper>
      </section>
      <section id="work">
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          previousDecorationHeight={null}
          fill="secondary"
        >
          <SectionHeader title="Work" />
        </SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="background"
          previousDecorationHeight="tall"
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
          previousDecorationHeight="tall"
        ></SlidePanel>
        <SlidePanel
          orientation="right"
          decorationHeight="short"
          fill="background"
          previousDecorationHeight="short"
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
          previousDecorationHeight="short"
          fill="secondary"
        ></SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="short"
          fill="background"
          previousDecorationHeight="short"
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
      </section>
      <section id="blog">
        <SlidePanel
          orientation="right"
          decorationHeight="tall"
          previousDecorationHeight="short"
          fill="secondary"
        >
          <SectionHeader title="Blog" />
        </SlidePanel>
        <SlidePanel
          orientation="right"
          decorationHeight="tall"
          previousDecorationHeight="tall"
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
      </section>
      <section id="contact">
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="secondary"
          previousDecorationHeight="short"
        >
          <SectionHeader title="Contact" />
        </SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="background"
          previousDecorationHeight="tall"
        >
          <SectionContentWrapper>
            <Contact />
          </SectionContentWrapper>
        </SlidePanel>
      </section>
    </main>
  );
}
