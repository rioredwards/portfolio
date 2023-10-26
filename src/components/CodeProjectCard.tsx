import { base64StrPngFromGif } from 'gif-png-converter';
import Link from 'next/link';
import CodeCardPreview from './CodeCardPreview';

interface NewCodeProjectCardProps {
  title: string;
  preview: {
    url: string;
    title: string;
  };
  tags: string[];
}

function scaleFontSizeToFit(text: string) {
  if (text.length < 24) return 'text-2xl';
  if (text.length < 32) return 'text-xl';
  if (text.length < 40) return 'text-lg';
  if (text.length < 48) return 'text-base';
}

const NewCodeProjectCard: React.FC<NewCodeProjectCardProps> = async ({ title, preview, tags }) => {
  const previewPng = await base64StrPngFromGif(preview.url);

  const titleFontSize = scaleFontSizeToFit(title);

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="group relative flex flex-col items-center h-[260px] overflow-hidden rounded-lg hover:shadow-sm cursor-pointer">
        <Link href={`/${title}`} className="w-full h-full">
          <CodeCardPreview key={title} title={title} gifUrl={preview.url} pngStr={previewPng} />
        </Link>
        <div className="hidden z-30 group-hover:flex flex-col items-center justify-between p-2 md:p-4 text-white absolute top-8 w-full">
          <h1 className={titleFontSize}>
            <a className="block no-underline font-extrabold text-center" href="#">
              {title}
            </a>
          </h1>
          <div className="h-[1px] w-full mt-4 bg-white" />
          <div className="flex w-2/3 mt-12 items-center justify-center flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-semibold text-gray-200 bg-gray-700 mx-4 px-3 py-1 mt-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewCodeProjectCard;
