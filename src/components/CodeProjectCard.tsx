import ContentfulImage from '@/lib/contentful-image';
import { base64StrPngFromGif } from 'gif-png-converter';
import Link from 'next/link';

interface NewCodeProjectCardProps {
  title: string;
  preview: {
    url: string;
    title: string;
  };
  tags: string[];
}

const NewCodeProjectCard: React.FC<NewCodeProjectCardProps> = async ({ title, preview, tags }) => {
  const previewPng = await base64StrPngFromGif(preview.url);

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="group relative flex flex-col items-center h-[260px] overflow-hidden rounded-lg hover:shadow-sm">
        <Link href={`/${title}`} className="w-full h-full overflow-hidden">
          <ContentfulImage
            width={400}
            height={260}
            alt={preview.title}
            className="block group-hover:hidden z-10 inset-0 object-cover w-full h-full"
            src={preview.url}
          />
          <ContentfulImage
            width={400}
            height={260}
            alt={preview.title}
            className="hidden group-hover:block blur-sm inset-0 object-cover w-full h-full"
            src={previewPng}
          />
        </Link>
        <div className="hidden z-30 group-hover:flex flex-col items-center justify-between p-2 md:p-4 text-white absolute top-8 w-full">
          <h1 className="text-lg">
            <a className="block no-underline text-2xl font-extrabold text-center" href="#">
              {title}
            </a>
          </h1>
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
