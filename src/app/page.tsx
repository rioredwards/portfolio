import { draftMode } from 'next/headers';
import { getCodeProjectCardsContent, getHeroContent } from '@/lib/api';
import Hero from '@/components/Hero';
import CodeProjectCard from '@/components/CodeProjectCard';
import NewCodeCardContainer from '@/components/NewCodeCardContainer';
import NewCodeProjectCard from '@/components/NewCodeProjectCard';

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
    <div className="w-full">
      <div className="container px-5">
        <Hero PrimaryText={title} SecondaryText={secondaryText} AvatarURL={url} />
      </div>
      <hr />
      <div className="w-full bg-slate-200 flex items-center justify-center">
        <section className="w-full container py-6 px-5 md:px-1">
          <h1 className="w-full text-center font-bold text-3xl mb-4">CODE</h1>
          <div className="flex flex-wrap px-6">
            {codeProjectCards.map((codeProjectCard) => (
              <NewCodeProjectCard key={codeProjectCard.slug} {...codeProjectCard} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
