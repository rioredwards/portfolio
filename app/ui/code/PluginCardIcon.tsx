import { SVGFromUrl } from '@/ui/code/SVGFromUrl';

interface PluginCardIconProps {
  title: string;
  url: string;
}

const PluginCardIcon: React.FC<PluginCardIconProps> = ({ title, url }) => {
  return (
    <>
      <div>
        <SVGFromUrl
          key={title + 'colored'}
          animation="wiggle"
          title={title}
          url={url}
          containerClasses="h-5 w-5"
        />
      </div>
    </>
  );
};

export default PluginCardIcon;
