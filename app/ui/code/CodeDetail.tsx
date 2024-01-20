import { CodeDetail as CodeDetailType } from '@/lib/api';
import './CodeDetail.css';
import { Markdown } from '@/lib/markdown';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';
import Shield from '@/ui/code/Shield';
import CodeDetailSection from './CodeDetailSection';

const CodeDetail: React.FC<CodeDetailType> = ({
  title,
  headerImage,
  slogan,
  logo,
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
}) => {
  return (
    <section>
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
      {features && <CodeDetailSection name="Features" content={features} />}
      {preview && (
        <>
          <h2>Preview</h2>
          <MotionContentfulImage src={preview.url} height={220} width={730} />
        </>
      )}
      {usage && <CodeDetailSection name="Usage" content={usage} />}
      {configure && <CodeDetailSection name="Configure" content={configure} />}
      {lessonsLearned && <CodeDetailSection name="Lessons Learned" content={lessonsLearned} />}
      {reflection && <CodeDetailSection name="Reflection" content={reflection} />}
      {authors && <CodeDetailSection name="Authors" content={authors} />}
      {acknowledgements && <CodeDetailSection name="Acknowledgements" content={acknowledgements} />}
      {custom && <CodeDetailSection name="Custom" content={custom} />}
    </section>
  );
};

export default CodeDetail;
