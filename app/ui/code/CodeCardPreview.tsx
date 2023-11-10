import { CodeProject } from '@/lib/api';
import ContentfulImage from '@/ui/ContentfulImage';

interface Props {
  preview: CodeProject['preview'];
}

const CodeCardImage: React.FC<Props> = ({ preview }) => {
  return (
    <div className="overflow-hidden z-10 h-[216px] pointer-events-none">
      <ContentfulImage
        className="z-0 absolute h-[216px] w-full"
        alt={preview.title}
        src={preview.url}
        width={200}
        height={160}
      />
    </div>
  );
};

export default CodeCardImage;
