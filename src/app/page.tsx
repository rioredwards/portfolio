import { draftMode } from 'next/headers';
import { getCodeProjectCardsContent, getHeroContent } from '@/lib/api';
import Hero from '@/components/Hero';
import CodeProjectCard from '@/components/CodeProjectCard';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);
  const {
    title,
    secondaryText,
    avatar: { url },
  } = heroContent;

  const codeProjectCards = await getCodeProjectCardsContent(draftModeIsEnabled);

  return (
    <div className="container mx-auto px-5">
      <Hero PrimaryText={title} SecondaryText={secondaryText} AvatarURL={url} />
      <hr />
      <section className="container my-12 mx-auto px-4 md:px-12 ">
        <h1 className="w-full text-center font-bold text-3xl mb-12">CODE</h1>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {codeProjectCards.map((codeProjectCard) => (
            <CodeProjectCard key={codeProjectCard.slug} {...codeProjectCard} />
          ))}
        </div>
      </section>
    </div>
  );
}
