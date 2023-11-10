import { draftMode } from 'next/headers';
import { getCodeProjectCardsContent, getHeroContent } from '@/lib/api';
import GradientText from '@/ui/GradientText';
import Hero from '@/ui/hero/Hero';
import CodeProjectCard from '@/ui/code/CodeProjectCard';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  const codeProjectCards = await getCodeProjectCardsContent(draftModeIsEnabled);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="container px-5">
        <Hero {...heroContent} />
      </div>
      <hr />
      <div className="w-full flex items-center justify-center">
        <section className="w-screen py-6 px-0">
          <div className="flex justify-center items-center">
            <GradientText
              direction="to bottom right"
              elementType="h2"
              colors={['#EABC4C', '#EA4C4C']}
              className="text-4xl lg:text-5xl mb-8 lg:mb-12 font-black leading-loose mt-6"
              offset={{ x: 0, y: -1 }}
              shadowColor="#633E2740"
            >
              CODE
            </GradientText>
          </div>
          <div className="max-w-[1506px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-0 sm:px-2 justify-center items-center justify-items-center content-center">
            {codeProjectCards.map((codeProjectCard, idx) => (
              <CodeProjectCard key={codeProjectCard.slug} {...codeProjectCard} idx={idx} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
