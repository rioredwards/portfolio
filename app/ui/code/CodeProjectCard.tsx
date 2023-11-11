'use client';
import cssStyles from '@/ui/code/code.module.css';
import { CodeCardType, CodeProject } from '@/lib/api';
import { FC, useRef, useState } from 'react';
import { adjustColor } from '@/utils/colorUtils';
import WebsiteCard from '@/ui/code/WebsiteCard';
import CLICard from '@/ui/code/CLICard';
import PluginCard from '@/ui/code/PluginCard';
import CodeModal from '@/ui/code/CodeModal';
import { Variants, motion } from 'framer-motion';

const MAX_TITLE_LENGTH = 28;

const CARD_TYPE_MAP: Record<CodeCardType, FC<any>> = {
  website: WebsiteCard,
  cli: CLICard,
  plugin: PluginCard,
};

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
    scale: [null, 1.03],
    boxShadow: [null, '4px 11px 24px 0px rgba(0,0,0,0.34)'],
    transition: {
      duration: 0.1,
    },
  },
  isNotHover: {
    scale: 1,
    boxShadow: '1px 3px 4px 0px rgba(0,0,0,0.20)',
    transition: {
      duration: 0.1,
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
  const CardComponent = CARD_TYPE_MAP[codeCardIcon?.type || 'website'];
  const pluginIcons = codeCardIcon.pluginIconGrayscale
    ? [codeCardIcon.pluginIconGrayscale, codeCardIcon.pluginIconColored]
    : undefined;

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
          className="group w-full h-full rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden relative shadow-sm"
        >
          <div className="absolute inset-0 rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden">
            <CodeModal
              title={title}
              key={title + 'modal'}
              isOpen={modalIsOpen}
              setIsOpen={setModalIsOpen}
              onModalClose={onModalClose}
            />
            <CardComponent
              title={titleLimited}
              color={codeCardIcon?.bgColor}
              pluginIcons={pluginIcons}
              preview={preview}
              icon={codeCardIcon}
            />
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default CodeProjectCard;

// Code Card Aspect Ratio: 0.625
// Small Screens: 320w x 200h
// Medium Screens: 360w x 225h
