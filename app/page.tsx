import { draftMode } from 'next/headers';
import { getHeroContent } from '@/lib/api';
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
          <CodeCardsSection />
        </section>
      </div>
    </div>
  );
}
