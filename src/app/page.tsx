import { draftMode } from 'next/headers';
import { getCodeProjectCardsContent, getHeroContent } from '@/lib/api';
import Hero from '@/components/Hero';
import CodeProjectCard from '@/components/CodeProjectCard';
import GradientText from '@/components/GradientText';

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
    <div className="w-full flex flex-col items-center justify-start">
      <div className="container px-5">
        <Hero primaryText={title} secondaryText={secondaryText} avatarURL={url} />
      </div>
      <hr />
      <div className="w-full flex items-center justify-center">
        <section className="w-full container py-6 px-5 md:px-1">
          <GradientText
            direction="to bottom right"
            elementType="h2"
            colors={['#EABC4C', '#EA4C4C']}
            className="w-full text-center font-black text-4xl lg:text-5xl mb-12 xl:mb-16"
          >
            CODE
          </GradientText>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
            {codeProjectCards.map((codeProjectCard, idx) => (
              <CodeProjectCard key={codeProjectCard.slug} {...codeProjectCard} idx={idx} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
