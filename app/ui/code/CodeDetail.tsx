import { CodeDetail as CodeDetailType } from '@/lib/api';
import MotionContentfulImage from '@/ui/ContentfulImage';
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
    headerImage,
    slogan,
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
    <section
      className={clsx(
        renderContext === 'modal' && 'max-h-[80vh] overflow-y-scroll rounded-md px-8'
      )}
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
          <Markdown content={slogan} />
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
  );
};

export default CodeDetail;
