import { MessagesSquare } from "lucide-react";
import { Blog } from "../../components/blog";
import { MainSection } from "../../components/main-section";
import { Project } from "../../components/project";
import { SectionHeader } from "../../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <div className="mt-[160vh]">
        <MainSection
          orientation="left"
          height="tall"
          fill="secondary"
          topMargin="-mt-[200px]"
          bottomPadding="pb-[200px]"
        >
          <SectionHeader title="Temp Page" />
        </MainSection>
        <MainSection
          orientation="left"
          height="tall"
          fill="background"
          topMargin="-mt-[240px]"
          bottomPadding="pb-[200px]"
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
          height="tall"
          fill="secondary"
          topMargin="-mt-[200px]"
          bottomPadding="pb-[200px]"
        >
          <SectionHeader title="Blog" />
        </MainSection>
        <MainSection
          orientation="right"
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
      </div>
    </main>
  );
}
