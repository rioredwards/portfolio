import ContentfulImage from '@/lib/contentful-image';
import Link from 'next/link';

interface NewCodeProjectCardProps {
  title: string;
  preview: {
    url: string;
    title: string;
  };
  tags: string[];
}

const NewCodeProjectCard: React.FC<NewCodeProjectCardProps> = ({ title, preview, tags }) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Link href={`/${title}`}>
          <ContentfulImage
            width={600}
            height={600}
            alt={preview.title}
            className="block h-auto w-full"
            src={preview.url}
          />
        </Link>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              {title}
            </a>
          </h1>
          <p className="text-grey-darker text-sm">11/1/19</p>
        </header>
      </article>
    </div>
  );
};

export default NewCodeProjectCard;
