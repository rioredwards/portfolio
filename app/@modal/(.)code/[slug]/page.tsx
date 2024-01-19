import { draftMode } from 'next/headers';
import { Modal } from './modal';
import { getCodeDetailContent } from '@/lib/api';
import { convertContentfulDocumentToHTML } from 'contentful-rich-text-to-markdown-converter';
import { Markdown } from '../../../lib/markdown';

export default async function CodeModal({
  params: { slug: codeCardSlug },
}: {
  params: { slug: string };
}) {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeDetailContent(draftModeIsEnabled, codeCardSlug);

  const title = codeCardsContent[0].title;

  return (
    <Modal>
      <h1>{title}</h1>
      {/* <Markdown content={testSegment} /> */}
    </Modal>
  );
}
