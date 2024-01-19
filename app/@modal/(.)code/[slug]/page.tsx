import { draftMode } from 'next/headers';
import { Modal } from './modal';
import { getCodeDetailContent } from '@/lib/api';
import { convertContentfulDocumentToHTML } from 'contentful-rich-text-to-markdown-converter';
import { Markdown } from '../../../lib/markdown';
import MotionContentfulImage, { ContentfulImage } from '@/ui/ContentfulImage';

export default async function CodeModal({
  params: { slug: codeCardSlug },
}: {
  params: { slug: string };
}) {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeDetailContent(draftModeIsEnabled, codeCardSlug);

  const title = codeCardsContent.title;
  const headerImage = codeCardsContent.headerImage;
  const slogan = codeCardsContent.slogan;

  return (
    <Modal>
      <div className="flex justify-center mb-4">
        <h1 className="font-bold text-4xl text-gray-600">{title}</h1>
      </div>
      <MotionContentfulImage src={headerImage.url} height={220} width={730} />
      {slogan && <Markdown content={slogan}></Markdown>}
    </Modal>
  );
}
