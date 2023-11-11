import { CodeProject } from '@/lib/api';
import { CodeCardIcon, MotionCodeCardIcon } from '@/ui/code/CodeCardIcon';
import { MotionCodeCardPreview } from '@/ui/code/CodeCardPreview';
import { AnimatePresence, Variants } from 'framer-motion';

interface Props {
  title: string;
  color: string;
  isHover: boolean;
  icon: CodeProject['codeCardIcon'];
  preview: CodeProject['preview'];
}

const iconVariants: Variants = {
  displayed: {
    x: [410, 410, 0, 0],
    scale: [0.8, 0.8, 0.9, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  hidden: {
    x: [null, 0, 410, 410],
    scale: [null, 0.9, 0.8, 0.8],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const previewVariants = {
  displayed: {
    x: [-410, -410, 0, 0],
    scale: [0.8, 0.8, 0.9, 1],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  hidden: {
    x: [null, 0, -410, -410],
    scale: [null, 0.9, 0.8, 0.8],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// display: [null, same, slide, scale]
// hidden: [null, scale, slide, same]

const WebsiteCard: React.FC<Props> = ({ title, preview, icon, color, isHover }) => {
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
          {!isHover ? (
            <MotionCodeCardIcon
              key={icon.title + 'icon'}
              initial={'displayed'}
              animate={'displayed'}
              exit={'hidden'}
              icon={icon}
              isHover={isHover}
              variants={iconVariants}
            />
          ) : (
            <MotionCodeCardPreview
              key={preview.title + 'preview'}
              variants={previewVariants}
              preview={preview}
              initial={'hidden'}
              animate={'displayed'}
              exit={'hidden'}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebsiteCard;
