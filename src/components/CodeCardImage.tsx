import { CodeProject } from '../lib/api';
import SVGFromUrl from './SVGFromUrl';

type Props = CodeProject['codeCardIcon'] & { isHover: boolean };

const CodeCardImage: React.FC<Props> = ({
  title,
  iconColored,
  iconGrayscale,
  isHover,
  animation,
}) => {
  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center ${
        isHover ? 'drop-shadow-xl' : ''
      }`}
    >
      <SVGFromUrl
        key={title + 'grayscale'}
        title={title}
        url={iconGrayscale.url}
        containerClasses="h-36 w-36 group-hover:hidden flex items-center justify-center"
        animation="none"
      />
      <SVGFromUrl
        key={title + 'colored'}
        title={title}
        url={iconColored.url}
        containerClasses="h-36 w-36 hidden group-hover:flex items-center justify-center"
        animation={animation}
      />
    </div>
  );
};

export default CodeCardImage;
