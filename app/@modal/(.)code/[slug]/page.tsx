import { draftMode } from 'next/headers';
import { Modal } from './modal';
import { getCodeDetailContent } from '@/lib/api';
import { Markdown } from '../../../lib/markdown';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';
import Shield from '@/ui/code/Shield';

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
  const madeWith = codeCardsContent.madeWith;
  const features = codeCardsContent.features;
  const preview = codeCardsContent.preview;
  const usage = codeCardsContent.usage;
  const configure = codeCardsContent.configure;
  const lessonsLearned = codeCardsContent.lessonsLearned;
  const reflection = codeCardsContent.reflection;

  return (
    <Modal>
      <div className="flex justify-center mb-4">
        <h1 className="font-bold text-4xl text-gray-600">{title}</h1>
      </div>
      {logo && <MotionContentfulImage src={logo.url} height={64} width={64} />}
      {headerImage && <MotionContentfulImage src={headerImage.url} height={220} width={730} />}
      {slogan && <Markdown content={slogan} />}
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
      {description && <Markdown content={description} />}
      {!!madeWith?.length && (
        <>
          <h2>Made With</h2>
          <ul className="w-full max-w-xl flex flex-wrap items-center justify-center gap-1">
            {madeWith.map((shield, idx) => (
              <li key={idx}>
                <Shield shield={shield} />
              </li>
            ))}
          </ul>
        </>
      )}
      {features && (
        <>
          <h2>Features</h2>
          <Markdown content={features} />
        </>
      )}
      {preview && (
        <>
          <h2>Preview</h2>
          <MotionContentfulImage src={preview.url} height={220} width={730} />
        </>
      )}
      {usage && (
        <>
          <h2>Usage</h2>
          <Markdown content={usage} />
        </>
      )}
      {configure && (
        <>
          <h2>Configure</h2>
          <Markdown content={configure} />
        </>
      )}
      {lessonsLearned && (
        <>
          <h2>Lessons Learned</h2>
          <Markdown content={lessonsLearned} />
        </>
      )}
      {reflection && (
        <>
          <h2>Reflection</h2>
          <Markdown content={reflection} />
        </>
      )}
    </Modal>
  );
}
