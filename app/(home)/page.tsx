import { BlogCard, BlogModalHandler, RenderedBlog } from "@/components/blog";
import { Contact } from "@/components/contact";
import {
  Hero,
  SectionContentWrapper,
  SectionHeader,
  SlidePanel,
} from "@/components/layout";
import { mdxComponents } from "@/components/mdx";
import {
  ProjectCard,
  ProjectModalHandler,
  type RenderedProject,
} from "@/components/project/index";
import { projectImageScope } from "@/content/projects/project-images";
import { getBlogIcon } from "@/lib/blog-icons";
import { getAllBlogCards, getAllBlogsWithContent } from "@/lib/blogs";
import { getAllProjectCards, getAllProjectsWithContent } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Fragment, Suspense } from "react";

export default async function Home() {
  const projectCards = getAllProjectCards();
  const projectsWithContent = getAllProjectsWithContent();

  const blogCards = getAllBlogCards();
  const blogsWithContent = getAllBlogsWithContent();

  // Render MDX content on the server and pass as ReactNode to client modals
  const renderedProjects = new Map<string, RenderedProject>();
  for (const [slug, project] of projectsWithContent) {
    renderedProjects.set(slug, {
      frontmatter: project.frontmatter,
      renderedContent: (
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{ scope: projectImageScope }}
        />
      ),
    });
  }

  console.log("Page.tsx");

  const renderedBlogs = new Map<string, RenderedBlog>();
  for (const [slug, blog] of blogsWithContent) {
    renderedBlogs.set(slug, {
      frontmatter: blog.frontmatter,
      renderedContent: (
        <MDXRemote source={blog.content} components={mdxComponents} />
      ),
    });
  }

  return (
    <main className="min-h-screen bg-background">
      <section id="home" className="bg-secondary pb-40">
        <SectionContentWrapper className="py-0!">
          <Hero />
        </SectionContentWrapper>
      </section>

      <section id="work">
        <SlidePanel
          orientation="left"
          decorationHeight="tall"
          previousDecorationHeight={"short"}
          fill="secondary"
        >
          <SectionHeader title="Work" />
        </SlidePanel>
        {projectCards.map((project, index) => (
          <Fragment key={`${project.title}-${index}`}>
            <SlidePanel
              orientation={index % 2 === 0 ? "left" : "right"}
              decorationHeight={index === 0 ? "tall" : "short"}
              fill="background"
              previousDecorationHeight={index === 0 ? "tall" : "short"}
            >
              <SectionContentWrapper>
                <ProjectCard
                  orientation={index % 2 === 0 ? "left" : "right"}
                  category={project.category}
                  title={project.title}
                  slug={project.slug}
                  description={project.description}
                  skills={project.skills}
                  image={project.image}
                  brandColor={project.brandColor}
                />
              </SectionContentWrapper>
            </SlidePanel>
            {index < projectCards.length - 1 && (
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
              {blogCards.map((blog, index) => (
                <BlogCard
                  key={`${blog.title}-${index}`}
                  title={blog.title}
                  slug={blog.slug}
                  description={blog.description}
                  icon={getBlogIcon(blog.icon)}
                />
              ))}
            </div>
          </SectionContentWrapper>
        </SlidePanel>
      </section>

      <section id="contact" className="bg-secondary pb-24">
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
          fill="secondary"
          previousDecorationHeight="tall"
        >
          <SectionContentWrapper>
            <Contact />
          </SectionContentWrapper>
        </SlidePanel>
      </section>

      <Suspense>
        <ProjectModalHandler projectsMap={renderedProjects} />
        <BlogModalHandler blogsMap={renderedBlogs} />
      </Suspense>
    </main>
  );
}
