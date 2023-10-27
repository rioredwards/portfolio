// import { base64StrPngFromGif } from 'gif-png-converter';
import Link from 'next/link';
import CodeCardPreview from './CodeCardPreview';
import CodeCardText from './CodeCardText';
import { CodeProjectCard } from '@/lib/api';

const NewCodeProjectCard: React.FC<CodeProjectCard> = async ({
  title,
  preview,
  tags,
  description,
  slogan,
}) => {
  // const previewPng = await base64StrPngFromGif(preview.url);

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="group relative flex flex-col items-center h-[260px] overflow-hidden rounded-lg hover:shadow-md cursor-pointer">
        <Link href={`/${title}`} className="w-full h-full">
          <CodeCardPreview key={title} title={title} gifUrl={preview.url} />
        </Link>
        <CodeCardText key={title} title={title} bodyText={slogan ?? description} tags={tags} />
      </article>
    </div>
  );
};

export default NewCodeProjectCard;
