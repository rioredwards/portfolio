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
      <article className="group relative flex flex-col items-center h-[260px] overflow-hidden rounded-lg hover:shadow-lg">
        <Link href={`/${title}`} className="w-full h-full">
          <ContentfulImage
            width={400}
            height={260}
            alt={preview.title}
            className="inset-0 object-cover w-full h-full"
            src={preview.url}
          />
        </Link>
        <header className="hidden group-hover:flex items-center justify-between p-2 md:p-4 z-10 absolute top-1/2">
          <h1 className="text-lg">
            <a className="no-underline text-white text-2xl font-bold" href="#">
              {title}
            </a>
          </h1>
        </header>
      </article>
    </div>
  );
};

export default NewCodeProjectCard;
