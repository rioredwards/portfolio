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

  const testSegment = codeCardsContent[0].usage;
  // console.log(testSegment);

  // const html = convertContentfulDocumentToHTML(testSegment);

  return (
    <Modal>
      <Markdown content={testSegment} />
      {/* <h1>{JSON.stringify(testSegment)}</h1> */}
      {/* <span dangerouslySetInnerHTML={{ __html: html }}></span> */}
    </Modal>
  );
}
