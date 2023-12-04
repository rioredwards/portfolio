import { draftMode } from 'next/headers';
import { getHeroContent } from '@/lib/api';
import GradientText from '@/ui/GradientText';
import Hero from '@/ui/hero/Hero';
import CodeCardsSection from './ui/code/CodeCardsSection';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="container px-5">
        <Hero {...heroContent} />
      </div>
      <hr />
      <div className="w-full flex items-center justify-center">
        <section className="w-screen py-6 px-0" id="code">
          <div className="flex justify-center items-center">
            <GradientText
              direction="to bottom right"
              elementType="h2"
              colors={['#EABC4C', '#EA4C4C']}
              className="text-4xl lg:text-5xl mb-8 lg:mb-20 font-black leading-loose mt-6"
              offset={{ x: 0, y: -1 }}
              shadowColor="#633E2740"
            >
              CODE
            </GradientText>
          </div>
          <CodeCardsSection />
        </section>
      </div>
    </div>
  );
}
