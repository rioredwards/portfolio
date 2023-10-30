import { CodeProject } from '../lib/api';
import SVGFromUrl from './SVGFromUrl';

type Props = CodeProject['codeCardIcon'] & { isHover: boolean };

const CodeCardImage: React.FC<Props> = ({ title, iconColored, iconGrayscale, isHover }) => {
  const url = isHover ? iconColored.url : iconGrayscale.url;

  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center ${
        isHover ? 'drop-shadow-xl' : ''
      }`}
    >
      <SVGFromUrl key={title} title={title} url={url} className="h-32 w-32" />
    </div>
  );
};

export default CodeCardImage;
