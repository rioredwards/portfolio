import { draftMode } from 'next/headers';
import { getCodeCardsContent } from '@/lib/api';
import CodeCard from './CodeCard';

const CodeCardsSection = async () => {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeCardsContent(draftModeIsEnabled);

  return (
    <div className="w-full max-w-[448px] sm:max-w-[720px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1600px] px-8 sm:px-12 md:px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center items-center justify-items-center content-center">
      {codeCardsContent.map((codeProjectCard, idx) => (
        <CodeCard key={codeProjectCard.slug} {...codeProjectCard} idx={idx} />
      ))}
    </div>
  );
};

export default CodeCardsSection;
