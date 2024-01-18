import { draftMode } from 'next/headers';
import { Modal } from './modal';
import { getCodeDetailContent } from '@/lib/api';
import { convertContentfulDocumentToHTML } from 'contentful-rich-text-to-markdown-converter';

export default async function CodeModal({
  params: { slug: codeCardSlug },
}: {
  params: { slug: string };
}) {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const codeCardsContent = await getCodeDetailContent(draftModeIsEnabled, codeCardSlug);

  const html = convertContentfulDocumentToHTML(codeCardsContent[0]?.slogan?.json);
  console.log(html);

  return (
    <Modal>
      {/* <h1>{JSON.stringify(codeCardsContent[0]?.slogan?.json)}</h1> */}
      <span dangerouslySetInnerHTML={{ __html: html }}></span>
    </Modal>
  );
}
