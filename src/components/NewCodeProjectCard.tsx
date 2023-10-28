// import { base64StrPngFromGif } from 'gif-png-converter';
import Link from 'next/link';
import CodeCardPreview from './CodeCardPreview';
import CodeCardText from './CodeCardText';
import { CodeProject } from '@/lib/api';
import NewCodeCardContainer from './NewCodeCardContainer';

const NewCodeProjectCard: React.FC<CodeProject> = async ({
  title,
  preview,
  tags,
  description,
  slogan,
}) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="group bg-slate-50 border-solid border-8 border-gray-300 relative flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer">
        <Link href={`/${title}`} className="w-full h-full">
          <NewCodeCardContainer />
        </Link>
      </article>
    </div>
  );
};

export default NewCodeProjectCard;
