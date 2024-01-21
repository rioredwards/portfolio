'use client';

import { ContentfulImage as ContentfulImageType } from '@/lib/dataTypes';
import MotionContentfulImage from '@/ui/ContentfulImage';

interface Props {
  title: string;
  logo?: ContentfulImageType;
}

const CodeModalHeader: React.FC<Props> = ({ title, logo }) => {
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant',
        });
        window.location.reload();
      }}
      className="flex cursor-pointer group"
    >
      {logo && (
        <MotionContentfulImage
          src={logo.url}
          height={64}
          width={64}
          alt={logo.title}
          className="rounded-md w-auto h-10 mr-4"
        />
      )}
      <h1 className="group-hover:text-sky-400 font-bold text-4xl text-gray-600 whitespace-nowrap">
        {title}
      </h1>
    </div>
  );
};

export default CodeModalHeader;
