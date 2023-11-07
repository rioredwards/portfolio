import { draftMode } from 'next/headers';
import { getCodeProjectCardsContent, getHeroContent } from '@/lib/api';
import GradientText from '@/ui/GradientText';
import Hero from '@/ui/Hero';
import CodeProjectCard from '@/ui/CodeProjectCard';
import params from '@/ui/params';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  const codeProjectCards = await getCodeProjectCardsContent(draftModeIsEnabled);

  return (
    <div
      style={{
        background: `linear-gradient(to bottom right, ${params.BG_GRADIENT_COLORS.join(', ')})`,
      }}
      className="w-full flex flex-col items-center justify-start"
    >
      <div className="container px-5">
        <Hero {...heroContent} />
      </div>
      <hr />
      <div className="w-full flex items-center justify-center">
        <section className="w-full container py-6 px-5 md:px-1">
          <div className="flex justify-center items-center">
            <GradientText
              direction="to bottom right"
              elementType="h2"
              colors={['#EABC4C', '#EA4C4C']}
              className="font-black text-4xl lg:text-5xl mb-12 xl:mb-16"
              offset={{ x: 0, y: -2 }}
              shadowColor="#ffffff"
            >
              CODE
            </GradientText>
          </div>
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
