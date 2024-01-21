import { draftMode } from 'next/headers';
import { getCodeCardsContent } from '@/lib/api';
import CodeCard from './CodeCard';
import GradientText from '../GradientText';

const CodeCardsSection = async () => {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeCardsContent(draftModeIsEnabled);

  return (
    <>
      <div className="flex justify-center items-center">
        <GradientText
          direction="to bottom right"
          elementType="h2"
          colors={['#F2A764', '#F26864']}
          className="text-4xl lg:text-5xl mb-8 lg:mb-20 font-black leading-loose mt-6"
          offset={{ x: 0, y: -1 }}
          shadowColor="#633E2740"
        >
          CODE
        </GradientText>
        <div id="modal-root" />
      </div>
      <div className="w-full max-w-[448px] sm:max-w-[720px] md:max-w-[900px] lg:max-w-[1200px] xl:max-w-[1600px] px-8 sm:px-12 md:px-16 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center items-center justify-items-center content-center">
        {codeCardsContent.map((codeProjectCard, idx) => (
          <CodeCard key={codeProjectCard.slug} {...codeProjectCard} idx={idx} />
        ))}
      </div>
    </>
  );
};

export default CodeCardsSection;
