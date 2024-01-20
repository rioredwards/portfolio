import { CodeDetail as CodeDetailType } from '@/lib/api';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';
import Shield from '@/ui/code/Shield';
import clsx from 'clsx';
import { Markdown } from '@/ui/code/Markdown';
import CodeDetailSection from '@/ui/code/CodeDetailSection';
import ExternalLinkIcon from '../icons/ExternalLinkIcon';

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
      <div className="flex justify-start items-center mb-4 mt-6 ml-8">
        <h1 className="font-bold text-4xl text-gray-600 mb-1 whitespace-nowrap mr-6">{title}</h1>
        {!!links?.length && (
          <ul className="w-full flex items-center justify-start gap-4 h-6 mt-0.5 align-baseline">
            {links.map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.url}
                  target="_blank"
                  className="hover:text-white hover:bg-sky-400 text-sky-600 border border-sky-300 rounded-full min-w-[3rem] whitespace-nowrap py-1 px-2 flex items-center justify-center gap-1 cursor-pointer"
                >
                  {link.displayText}
                  <ExternalLinkIcon className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        )}
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
            className="rounded-md w-full h-auto my-4"
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
    </section>
  );
};

export default CodeDetail;
