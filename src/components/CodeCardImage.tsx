import ContentfulImage from '@/lib/contentful-image';
import { CodeProject } from '../lib/api';

type Props = CodeProject['codeCardIcon'] & { isHover: boolean };

const CodeCardImage: React.FC<Props> = ({ title, iconColored, iconGrayscale, isHover }) => {
  const image = isHover ? iconColored.url : iconGrayscale.url;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <ContentfulImage src={image} alt={title} height={150} width={150} />
    </div>
  );
};

export default CodeCardImage;
