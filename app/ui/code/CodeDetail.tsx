import { CodeDetail as CodeDetailType } from '@/lib/api';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';
import Shield from '@/ui/code/Shield';
import clsx from 'clsx';
import { Markdown } from '@/ui/code/Markdown';
import CodeDetailSection from '@/ui/code/CodeDetailSection';

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
        className={clsx(renderContext === 'modal' && 'max-h-112 overflow-y-scroll rounded-md px-8')}
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
          <CodeDetailSection>
            <div className="flex items-center justify-center text-lg">
              <Markdown content={slogan} />
            </div>
          </CodeDetailSection>
        )}
        {description && (
          <CodeDetailSection>
            <Markdown content={description} />
          </CodeDetailSection>
        )}
        {!!madeWith?.length && (
          <div className="mb-2">
            <CodeDetailSection name={'Made With'}>
              <ul className="w-full flex flex-wrap items-center justify-start gap-1">
                {madeWith.map((shield, idx) => (
                  <li key={idx}>
                    <Shield shield={shield} />
                  </li>
                ))}
              </ul>
            </CodeDetailSection>
          </div>
        )}
        {features && (
          <CodeDetailSection name={'Features'}>
            <Markdown content={features} />
          </CodeDetailSection>
        )}
        {preview && (
          <CodeDetailSection name={'Preview'}>
            <MotionContentfulImage src={preview.url} height={220} width={730} alt={preview.title} />
          </CodeDetailSection>
        )}
        {usage && (
          <CodeDetailSection name={'Usage'}>
            <Markdown content={usage} />
          </CodeDetailSection>
        )}
        {configure && (
          <CodeDetailSection name={'Configure'}>
            <Markdown content={configure} />
          </CodeDetailSection>
        )}
        {lessonsLearned && (
          <CodeDetailSection name={'Lessons Learned'}>
            <Markdown content={lessonsLearned} />
          </CodeDetailSection>
        )}
        {reflection && (
          <CodeDetailSection name={'Reflection'}>
            <Markdown content={reflection} />
          </CodeDetailSection>
        )}
        {authors && (
          <CodeDetailSection name={'Authors'}>
            <Markdown content={authors} />
          </CodeDetailSection>
        )}
        {acknowledgements && (
          <CodeDetailSection name={'Acknowledgements'}>
            <Markdown content={acknowledgements} />
          </CodeDetailSection>
        )}
        {custom && (
          <CodeDetailSection>
            <Markdown content={custom} />
          </CodeDetailSection>
        )}
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
