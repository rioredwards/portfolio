import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Project } from "@/components/project";
import { SectionBreak } from "@/components/section-break";
import { getCodeCardsContent, getHeroContent } from "@/lib/api";
import { MessagesSquare } from "lucide-react";
import { draftMode } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const { isEnabled: draftModeIsEnabled } = await draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);
  const codeCardsContent = await getCodeCardsContent(draftModeIsEnabled);
  console.log("codeCardsContent", codeCardsContent);

  return (
    <main className="bg-background min-h-screen">
      <section id="home">
        <div className="section-content pt-24 pb-16 md:pt-48 md:pb-40">
          <Hero
            title={heroContent.title}
            paragraphs={[
              heroContent.secondaryText,
              heroContent.tertiaryText ?? "",
            ]}
            image={
              <Image
                src={heroContent.avatar.url}
                alt={heroContent.avatar.title}
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
        {codeCardsContent.map((codeCard, index) => (
          <div key={codeCard.id}>
            <div className="section-content py-12 md:py-16 lg:py-32">
              <Project
                title={codeCard.title}
                category={codeCard.type}
                skills={codeCard.madeWith ?? []}
                orientation={index % 2 === 0 ? "left" : "right"}
                image={codeCard.preview.url}
                description={codeCard.description ?? null}
              />
            </div>
            {index < codeCardsContent.length - 1 && (
              <SectionBreak
                orientation={index % 2 === 0 ? "right" : "left"}
                height="short"
              />
            )}
          </div>
        ))}
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
