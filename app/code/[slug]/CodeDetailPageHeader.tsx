import { ContentfulImage as ContentfulImageType } from '@/lib/dataTypes';
import MotionContentfulImage from '@/ui/ContentfulImage';

interface Props {
  title: string;
  logo?: ContentfulImageType;
}

const CodeDetailPageHeader: React.FC<Props> = ({ title, logo }) => {
  return (
    <div className="flex">
      {logo && (
        <MotionContentfulImage
          src={logo.url}
          height={64}
          width={64}
          alt={logo.title}
          className="rounded-md w-auto h-10 mr-4"
        />
      )}
      <h1 className="font-bold text-4xl text-gray-600 mb-1 whitespace-nowrap mr-6">{title}</h1>
    </div>
  );
};

export default CodeDetailPageHeader;
