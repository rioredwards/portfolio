import { MessagesSquare } from "lucide-react";
import { Blog } from "../../components/blog";
import { SlidePanel } from "../../components/slide-panel";
import { Project } from "../../components/project";
import { SectionHeader } from "../../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mt-48">
        <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
          <SectionHeader title="Temp Page" />
        </SlidePanel>
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="background"
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
        </SlidePanel>
      </div>
    </main>
  );
}
