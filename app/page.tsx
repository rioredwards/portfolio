import { draftMode } from 'next/headers';
import { getHeroContent } from '@/lib/api';
import Hero from '@/ui/hero/Hero';
import CodeCardsSection from './ui/code/CodeCardsSection';
import ContactForm from './ui/contact/ContactForm';
import About from './ui/about/About';
import Art from './ui/art/Art';

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <section className="mt-44 2xl:mt-72 container px-5 flex justify-around items-center flex-col">
        <Hero {...heroContent} />
      </section>
      <hr />
      <div className="mt-24 2xl:mt-36 mb-24 w-full flex items-center justify-center">
        <section className="w-full py-6 px-0" id="code">
          <CodeCardsSection />
        </section>
      </div>
      <section className="w-full py-6 px-0 mb-28 flex flex-col items-center justify-start" id="art">
        <Art />
      </section>
      <section
        className="w-full py-6 px-0 mb-28 flex flex-col items-center justify-start"
        id="about"
      >
        <About />
      </section>
      <section className="w-full py-6 px-0" id="contact">
        <ContactForm />
      </section>
    </div>
  );
}
