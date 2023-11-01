import { CodeProject } from '@/lib/api';
import HoverGradient from './HoverGradient';
import SVGFromUrl from './SVGFromUrl';

interface Props {
  title: string;
  children: React.ReactNode;
  color: string;
  isHover: boolean;
  pluginIcons: [
    CodeProject['codeCardIcon']['pluginIconGrayscale'],
    CodeProject['codeCardIcon']['pluginIconColored'],
  ];
}

const PluginCard: React.FC<Props> = ({ title, children, color, isHover, pluginIcons }) => {
  return (
    <>
      <div className="z-10 w-full h-16 flex items-center gap-3">
        <div className="mt-8 h-[150%] w-28 flex items-center justify-center group-hover:border-white group-hover:bg-gray-500 group-hover:border-b-4 group-hover:border-r-4 rounded-br-4xl">
          <SVGFromUrl
            key={title + 'grayscale'}
            animation="none"
            title={pluginIcons[0].title}
            url={pluginIcons[0].url}
            containerClasses={`h-16 w-16 ${isHover ? 'hidden' : ''}`}
          />
          <SVGFromUrl
            key={title + 'colored'}
            animation="wiggle"
            title={pluginIcons[1].title}
            url={pluginIcons[1].url}
            containerClasses={`h-16 w-16 ${isHover ? '' : 'hidden'}`}
          />
        </div>
        <div className="flex items-center grow h-8 px-2">
          <h3 className="text-xl font-bold text-gray-500 whitespace-nowrap">{title}</h3>
        </div>
      </div>
      {children}
      {isHover && (
        <HoverGradient
          radius={500}
          key={title + 'gradient'}
          color={color}
          classes="w-full h-full rounded-4xl"
        />
      )}
    </>
  );
};

export default PluginCard;
