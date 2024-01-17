import { draftMode } from 'next/headers';
import { getHeroContent } from '@/lib/api';
import Hero from '@/ui/hero/Hero';
import CodeCardsSection from './ui/code/CodeCardsSection';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <section className="mt-24 md:mt-36 xl:mt-48 container px-5 flex justify-around items-center flex-col">
        <Hero {...heroContent} />
      </section>
      <hr />
      <div className="mt-24 md:mt-36 xl:mt-48 w-full flex items-center justify-center">
        <section className="w-screen py-6 px-0" id="code">
          <CodeCardsSection />
        </section>
      </div>
    </div>
  );
}
