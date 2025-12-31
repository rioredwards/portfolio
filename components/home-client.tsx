"use client";

import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project, type Project as ProjectType } from "@/components/project";
import { ProjectDetailModalClient } from "@/components/project-detail-modal-client";
import { SectionContentWrapper } from "@/components/section-content-wrapper";
import { SlidePanel } from "@/components/slide-panel";
import { BLOGS } from "@/lib/blogs-data";
import { ParsedProjectContent } from "@/lib/parse-project-markdown";
import { PROJECTS } from "@/lib/projects-data";
import profileImage from "@/public/profile.webp";
import Image from "next/image";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { SectionHeader } from "./section-header";

interface HomeClientProps {
  projectContentMap: Map<string, ParsedProjectContent>;
}

export function HomeClient({ projectContentMap }: HomeClientProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
        {PROJECTS.map((project, index) => (
          <Fragment key={`${project.title}-${index}`}>
            <SlidePanel
              orientation={index % 2 === 0 ? "left" : "right"}
              decorationHeight={index === 0 ? "tall" : "short"}
              fill="background"
              previousDecorationHeight={index === 0 ? "tall" : "short"}
            >
              <SectionContentWrapper>
                <Project
                  orientation={index % 2 === 0 ? "left" : "right"}
                  category={project.category}
                  title={project.title}
                  description={project.description}
                  skills={project.skills}
                  image={project.image}
                  onClick={() => handleProjectClick(project)}
                />
              </SectionContentWrapper>
            </SlidePanel>
            {index < PROJECTS.length - 1 && (
              <SlidePanel
                orientation={index % 2 === 0 ? "right" : "left"}
                decorationHeight="short"
                fill="secondary"
                previousDecorationHeight={index === 0 ? "tall" : "short"}
              />
            )}
          </Fragment>
        ))}
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
              {BLOGS.map((blog, index) => (
                <Blog
                  key={`${blog.title}-${index}`}
                  title={blog.title}
                  description={blog.description}
                  icon={blog.icon}
                />
              ))}
            </div>
          </SectionContentWrapper>
        </SlidePanel>
      </section>
      <section id="contact">
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          fill="secondary"
          previousDecorationHeight="tall"
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
      <ProjectDetailModalClient
        projectContentMap={projectContentMap}
        selectedProject={selectedProject}
        isModalOpen={isModalOpen}
        onProjectSelect={setSelectedProject}
        onModalOpenChange={setIsModalOpen}
      />
    </main>
  );
}
