import { CodeDetail as CodeDetailType } from '@/lib/api';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';
import Shield from '@/ui/code/Shield';
import CodeDetailSection from './CodeDetailMarkdown';
import clsx from 'clsx';
import { Markdown } from '@/ui/code/Markdown';

interface Props {
  content: CodeDetailType;
  renderContext?: 'modal' | 'page';
}

const CodeDetail: React.FC<Props> = ({
  content: {
    title,
    headerImage,
    slogan,
    links,
    description,
    madeWith,
    features,
    preview,
    usage,
    configure,
    lessonsLearned,
    reflection,
    authors,
    acknowledgements,
    custom,
  },
  renderContext = 'page',
}) => {
  return (
    <section>
      <div className="flex flex-col justify-center items-center mb-4">
        <h1 className="font-bold text-4xl text-gray-600 mb-1">{title}</h1>
      </div>
      <section
        className={clsx(renderContext === 'modal' && 'max-h-112 overflow-y-scroll rounded-md px-4')}
      >
        {headerImage && (
          <MotionContentfulImage
            src={headerImage.url}
            height={220}
            width={730}
            alt={headerImage.title}
            className="rounded-md w-full h-auto mb-4"
          />
        )}
        {slogan && (
          <div className="flex items-center justify-center text-lg mb-1">
            <Markdown content={slogan} />
          </div>
        )}
        {description && <Markdown content={description} />}
        {!!madeWith?.length && (
          <div className="mb-2">
            <div className="flex justify-center mb-2">
              <h2 className="font-bold text-2xl text-gray-600 mb-1">Made With</h2>
            </div>
            <ul className="w-full flex flex-wrap items-center justify-center gap-1">
              {madeWith.map((shield, idx) => (
                <li key={idx}>
                  <Shield shield={shield} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {features && <CodeDetailSection name="Features" content={features} />}
        {preview && (
          <>
            <h2>Preview</h2>
            <MotionContentfulImage src={preview.url} alt={preview.title} height={220} width={730} />
          </>
        )}
        {usage && <CodeDetailSection name="Usage" content={usage} />}
        {configure && <CodeDetailSection name="Configure" content={configure} />}
        {lessonsLearned && <CodeDetailSection name="Lessons Learned" content={lessonsLearned} />}
        {reflection && <CodeDetailSection name="Reflection" content={reflection} />}
        {authors && <CodeDetailSection name="Authors" content={authors} />}
        {acknowledgements && (
          <CodeDetailSection name="Acknowledgements" content={acknowledgements} />
        )}
        {custom && <CodeDetailSection name="Custom" content={custom} />}
      </section>
      {!!links?.length && (
        <ul className="w-full flex items-center justify-center gap-8 h-6 mt-0.5">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link href={link.url} target="_blank" className="text-sky-600">
                {link.displayText}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CodeDetail;
