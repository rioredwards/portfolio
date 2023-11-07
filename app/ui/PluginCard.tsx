import { CodeProject } from '@/lib/api';
import HoverGradient from '@/ui/HoverGradient';
import SVGFromUrl from '@/ui/SVGFromUrl';

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
        <div className="mt-4 h-[130%] w-24 flex items-center justify-center group-hover:border-gray-300 group-hover:bg-gray-200 group-hover:border-b-2 group-hover:border-r-2 rounded-br-4xl">
          <SVGFromUrl
            key={title + 'grayscale'}
            animation="none"
            title={pluginIcons[0].title}
            url={pluginIcons[0].url}
            containerClasses={`h-12 w-12 ${isHover ? 'hidden' : ''}`}
          />
          <SVGFromUrl
            key={title + 'colored'}
            animation="wiggle"
            title={pluginIcons[1].title}
            url={pluginIcons[1].url}
            containerClasses={`h-12 w-12 ${isHover ? '' : 'hidden'}`}
          />
        </div>
        <div className="flex items-center grow h-8 px-2">
          <h3 className="text-xl font-extrabold text-[#a8a8a8] group-hover:text-gray-500 whitespace-nowrap">
            {title}
          </h3>
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
