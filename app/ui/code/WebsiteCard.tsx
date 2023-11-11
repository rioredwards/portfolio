import { CodeProject } from '@/lib/api';
import { CodeCardIcon, MotionCodeCardIcon } from '@/ui/code/CodeCardIcon';
import { MotionCodeCardPreview } from '@/ui/code/CodeCardPreview';
import { AnimatePresence, Variants } from 'framer-motion';

interface Props {
  title: string;
  color: string;
  icon: CodeProject['codeCardIcon'];
  preview: CodeProject['preview'];
}

const iconVariants: Variants = {
  isNotHover: {
    opacity: [null, 1],
    scale: [null, 1],
    transition: {
      delay: 0.1,
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
  isHover: {
    opacity: [null, 0],
    scale: [null, 0.8],
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
};

const previewVariants: Variants = {
  isHover: {
    opacity: [null, 1],
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
  isNotHover: {
    opacity: [null, 0],
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const WebsiteCard: React.FC<Props> = ({ title, preview, icon, color }) => {
  return (
    <div className="h-full w-full overflow-hidden">
      {/* Website Top Panel */}
      <div className="z-10 w-full h-[20%] pt-[1%] bg-gray-100 flex items-center pr-[8%] pl-[8%] border-b-2">
        {/* Circles */}
        <div className="flex-shrink-0 h-full w-[25%] flex items-center justify-between">
          {/* Red */}
          <div className="w-[30%]">
            <div className="relative w-full pt-[100%]">
              <div className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-white bg-gradient-to-br from-red-200 to-red-400" />
            </div>
          </div>
          {/* Yellow */}
          <div className="w-[30%]">
            <div className="relative w-full pt-[100%]">
              <div className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-white bg-gradient-to-br from-yellow-200 to-yellow-300" />
            </div>
          </div>
          {/* Green */}
          <div className="w-[30%]">
            <div className="relative w-full pt-[100%]">
              <div className="absolute top-0 left-0 right-0 bottom-0 m-auto rounded-full bg-white bg-gradient-to-br from-green-200 to-green-400" />
            </div>
          </div>
        </div>
        {/* Searchbar */}
        <div className="flex items-center grow bg-white h-[70%] rounded-[10px] px-2 ml-[3%]">
          <h3 className="text-xl font-extrabold text-gray-500 whitespace-nowrap">{title}</h3>
        </div>
      </div>
      <div className="h-[80%]">
        <AnimatePresence>
          <MotionCodeCardIcon key={icon.title + 'icon'} icon={icon} variants={iconVariants} />
          <MotionCodeCardPreview
            key={preview.title + 'preview'}
            variants={previewVariants}
            preview={preview}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebsiteCard;
