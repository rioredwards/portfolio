'use client';
import cssStyles from '@/ui/code/code.module.css';
import { CodeCardType, CodeProject } from '@/lib/api';
import { FC, useRef, useState } from 'react';
import { adjustColor } from '@/utils/colorUtils';
import CodeModal from '@/ui/code/CodeModal';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { MotionCodeCardIcon } from './CodeCardIcon';
import { MotionCodeCardPreview } from './CodeCardPreview';

const MAX_TITLE_LENGTH = 28;

function limitTitle(title: string) {
  if (title.length > MAX_TITLE_LENGTH) {
    return title.slice(0, MAX_TITLE_LENGTH) + '...';
  }
  return title;
}

const generateBgGradientColors = (bgColor: string): string[] => {
  const topRightColor = adjustColor(bgColor, 10, -20);
  const middleColor = bgColor;
  const bottomLeftColor = adjustColor(bgColor, -10, 15);
  return [topRightColor, middleColor, bottomLeftColor];
};

const generateBgGradient = ([color1, color2, color3]: string[]): string => {
  return `linear-gradient(to bottom right, ${color1}, ${color2}, ${color3})`;
};

const codeCardVariants: Variants = {
  isHover: {
    scale: [null, 1.01],
    boxShadow: [null, '2px 8px 18px 0px rgba(0,0,0,0.34)'],
    transition: {
      duration: 0.1,
    },
  },
  isNotHover: {
    scale: 1,
    boxShadow: '1px 3px 6px 0px rgba(0,0,0,0.10)',
    transition: {
      duration: 0.1,
    },
  },
};

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

const CodeProjectCard: React.FC<CodeProject & { idx: number }> = ({
  title,
  codeCardIcon,
  preview,
  idx,
}) => {
  const hoverDisabled = useRef(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const bgGradient = generateBgGradientColors(codeCardIcon?.bgColor);
  const titleLimited = limitTitle(title);
  const pluginIcon = codeCardIcon.pluginIconColored;

  const onModalClose = () => {
    // Wait for 1ms to prevent the modal from reopening immediately
    setTimeout(() => {
      setModalIsOpen(false);
      hoverDisabled.current = false;
    }, 1);
  };

  const onHoverStart = () => {
    if (hoverDisabled.current) return;
    setIsHover(true);
  };

  const onHoverEnd = () => {
    if (hoverDisabled.current) return;
    setIsHover(false);
  };

  const onClick = () => {
    setIsHover(false);
    hoverDisabled.current = true;
    setModalIsOpen(true);
  };

  return (
    <div className={`${cssStyles.codeCardContainer}`}>
      <div className={`${cssStyles.codeCardContent}`}>
        <motion.article
          style={{ background: generateBgGradient(bgGradient) }}
          onClick={onClick}
          animate={isHover ? 'isHover' : 'isNotHover'}
          variants={codeCardVariants}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          className="group w-full h-full rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden relative"
        >
          <div className="absolute inset-0 rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden">
            <CodeModal
              title={title}
              key={title + 'modal'}
              isOpen={modalIsOpen}
              setIsOpen={setModalIsOpen}
              onModalClose={onModalClose}
            />
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
                  <h3 className="text-xl font-extrabold text-gray-500 whitespace-nowrap">
                    {title}
                  </h3>
                </div>
              </div>
              {/* Icon + Preview */}
              <div className="h-[80%]">
                <AnimatePresence>
                  <MotionCodeCardIcon
                    key={codeCardIcon.title + 'icon'}
                    icon={codeCardIcon}
                    variants={iconVariants}
                  />
                  <MotionCodeCardPreview
                    key={preview.title + 'preview'}
                    variants={previewVariants}
                    preview={preview}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default CodeProjectCard;
