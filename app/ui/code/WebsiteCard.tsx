import { CodeProject } from '@/lib/api';
import CodeCardIcon from '@/ui/code/CodeCardIcon';
import CodeCardPreview from '@/ui/code/CodeCardPreview';

interface Props {
  title: string;
  color: string;
  isHover: boolean;
  icon: CodeProject['codeCardIcon'];
  preview: CodeProject['preview'];
}

const WebsiteCard: React.FC<Props> = ({ title, preview, icon, color, isHover }) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="z-10 w-full h-14 pt-1 bg-gray-100 flex items-center px-8 gap-3 border-b-2">
        <div className="flex-shrink-0 h-full w-24 min-w-28 flex items-center justify-between">
          <div className="h-7 w-7 rounded-full bg-white bg-gradient-to-br from-red-200 to-red-400" />
          <div className="h-7 w-7 rounded-full bg-white bg-gradient-to-br from-yellow-200 to-yellow-400" />
          <div className="h-7 w-7 rounded-full bg-white bg-gradient-to-br from-green-200 to-green-400" />
        </div>
        <div className="flex items-center grow bg-white h-8 rounded-md px-2 mr-2">
          <h3 className="text-xl font-extrabold text-gray-500 whitespace-nowrap">{title}</h3>
        </div>
      </div>
      <div className="h-52">
        {!isHover ? (
          <CodeCardIcon icon={icon} isHover={isHover} />
        ) : (
          <CodeCardPreview preview={preview} />
        )}
      </div>
    </div>
  );
};

export default WebsiteCard;
