import { SVGFromUrl } from '@/ui/code/SVGFromUrl';

interface PluginCardIconProps {
  title: string;
  url: string;
}

const PluginCardIcon: React.FC<PluginCardIconProps> = ({ title, url }) => {
  return (
    <div className="flex-shrink-0 h-full w-[25%] flex items-center justify-between">
      <div>
        <SVGFromUrl
          key={title + 'colored'}
          animation="wiggle"
          title={title}
          url={url}
          containerClasses="h-6 w-6"
        />
      </div>
    </div>
  );
};

export default PluginCardIcon;
