import { CodeDetail as CodeDetailType } from '@/lib/api';
import './CodeDetail.css';
import { Markdown } from '@/lib/markdown';
import MotionContentfulImage from '@/ui/ContentfulImage';
import Link from 'next/link';
import Shield from '@/ui/code/Shield';

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
      {authors && (
        <>
          <h2>Authors</h2>
          <Markdown content={authors} />
        </>
      )}
      {acknowledgements && (
        <>
          <h2>Acknowledgements</h2>
          <Markdown content={acknowledgements} />
        </>
      )}
      {custom && (
        <>
          <h2>Custom</h2>
          <Markdown content={custom} />
        </>
      )}
    </section>
  );
};

export default CodeDetail;
