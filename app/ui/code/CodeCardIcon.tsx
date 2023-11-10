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
        key={icon.title + 'colored'}
        title={icon.title}
        url={icon.iconColored.url}
        containerClasses="z-10 h-[60%] w-full pointer-events-none flex flex-col items-center justify-center"
        animation={icon.animation}
      />
    </div>
  );
};

export default CodeCardIcon;
