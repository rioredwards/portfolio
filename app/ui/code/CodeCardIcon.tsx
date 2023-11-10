import { CodeProject } from '@/lib/api';
import SVGFromUrl from '@/ui/code/SVGFromUrl';

interface Props {
  icon: CodeProject['codeCardIcon'];
  isHover: boolean;
}

const CodeCardIcon: React.FC<Props> = ({ isHover, icon }) => {
  return (
    <div
      className={`overflow-hidden z-10 h-full w-full flex flex-col items-center justify-center pointer-events-none ${
        isHover ? 'drop-shadow-xl' : ''
      }`}
    >
      <SVGFromUrl
        key={icon.title + 'grayscale'}
        title={icon.title}
        url={icon.iconColored.url}
        containerClasses="z-10 h-32 w-32 group-hover:hidden flex items-center justify-center pointer-events-none"
        animation="none"
      />
      <SVGFromUrl
        key={icon.title + 'colored'}
        title={icon.title}
        url={icon.iconColored.url}
        containerClasses="z-10 h-32 w-32 hidden group-hover:flex items-center justify-center pointer-events-none"
        animation={icon.animation}
      />
    </div>
  );
};

export default CodeCardIcon;
