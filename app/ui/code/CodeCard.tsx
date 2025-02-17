'use client';
import cssStyles from '@/ui/code/code.module.css';
import { CodeCard as CodeCardType } from '@/lib/dataTypes';
import { useState } from 'react';
import { adjustColor } from '@/utils/colorUtils';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { MotionCodeCardIcon } from '@/ui/code/CodeCardIcon';
import { MotionCodeCardPreview } from '@/ui/code/CodeCardPreview';
import WebsiteCardIcon from '@/ui/code/WebsiteCardIcon';
import CLICardIcon from '@/ui/code/CLICardIcon';
import PluginCardIcon from '@/ui/code/PluginCardIcon';
import Link from 'next/link';

const MAX_TITLE_LENGTH = 28;

function truncateTitle(title: string) {
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

const cardBorderColors = [
  '#50DD90',
  '#56CAA7',
  '#5DBBB7',
  '#5DB8BA',
  '#5EB3BE',
  '#60AAC8',
  '#6896DE',
];

const CodeProjectCard: React.FC<CodeCardType & { idx: number }> = ({
  idx,
  title,
  type,
  codeCardIcon,
  preview,
  pluginIcon,
  slug,
}) => {
  // const hoverDisabled = useRef(false);
  // const bgGradient = generateBgGradientColors(codeCardIcon?.bgColor);
  const titleTruncated = truncateTitle(title);
  const [isHover, setIsHover] = useState(false);

  const onHoverStart = () => {
    // if (hoverDisabled.current) return;
    setIsHover(true);
  };

  const onHoverEnd = () => {
    // if (hoverDisabled.current) return;
    setIsHover(false);
  };

  const onClick = () => {
    setIsHover(false);
    // hoverDisabled.current = true;
  };

  const codeCardTypeIcon = () => {
    switch (type) {
      case 'website':
        return <WebsiteCardIcon />;
      case 'plugin':
        if (!pluginIcon) throw new Error(`plugin icon is undefined for ${title}}`);
        return <PluginCardIcon {...pluginIcon} />;
      case 'cli':
        return <CLICardIcon />;
      default:
        return <WebsiteCardIcon />;
    }
  };

  return (
    <Link key={slug} href={`/code/${slug}`} passHref className={`${cssStyles.codeCardContainer}`}>
      <div className={`${cssStyles.codeCardContent}`}>
        <motion.article
          style={{ border: `2px solid ${cardBorderColors[idx % cardBorderColors.length]}` }}
          onClick={onClick}
          animate={isHover ? 'isHover' : 'isNotHover'}
          variants={codeCardVariants}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          className="bg-gray-100 group w-full h-full rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden relative"
        >
          <div className="absolute inset-0 rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden">
            <div className="h-full w-full overflow-hidden">
              <div className="z-10 w-full h-[18%] pt-[1%] flex items-center pr-[8%] pl-[8%]">
                <div className="flex-shrink-0 h-full w-[18%] flex items-center justify-between">
                  {codeCardTypeIcon()}
                </div>
                <div className="flex items-center grow h-[70%] px-2 ml-[3%]">
                  <h3 className="text-xl text-gray-600 font-extrabold whitespace-nowrap">
                    {titleTruncated}
                  </h3>
                </div>
              </div>
              {/* Icon + Preview */}
              <div className="h-[82%]">
                <AnimatePresence>
                  <MotionCodeCardIcon
                    key={title + 'icon'}
                    variants={iconVariants}
                    {...codeCardIcon}
                  />
                  <MotionCodeCardPreview
                    key={title + 'preview'}
                    variants={previewVariants}
                    {...preview}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </Link>
  );
};

export default CodeProjectCard;
