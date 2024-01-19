import { draftMode } from 'next/headers';
import { Modal } from './modal';
import { getCodeDetailContent } from '@/lib/api';
import { Markdown } from '../../../lib/markdown';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';

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
  const logo = codeCardsContent.logo;
  const links = codeCardsContent.links;
  const description = codeCardsContent.description;

  return (
    <Modal>
      <div className="flex justify-center mb-4">
        <h1 className="font-bold text-4xl text-gray-600">{title}</h1>
      </div>
      {logo && <MotionContentfulImage src={logo.url} height={64} width={64} />}
      {headerImage && <MotionContentfulImage src={headerImage.url} height={220} width={730} />}
      {slogan && <Markdown content={slogan}></Markdown>}
      {!!links?.length && (
        <ul className="w-full flex items-center justify-center gap-8">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link href={link.url} target="_blank">
                {link.displayText}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {description && <Markdown content={description}></Markdown>}
    </Modal>
  );
}
