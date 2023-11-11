'use client';
import cssStyles from '@/ui/code/code.module.css';
import { CodeCardType, CodeProject } from '@/lib/api';
import { FC, useRef, useState } from 'react';
import { adjustColor } from '@/utils/colorUtils';
import WebsiteCard from '@/ui/code/WebsiteCard';
import CLICard from '@/ui/code/CLICard';
import PluginCard from '@/ui/code/PluginCard';
import CodeModal from '@/ui/code/CodeModal';

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

  const onClick = () => {
    setIsHover(false);
    hoverDisabled.current = true;
    setModalIsOpen(true);
  };

  return (
    <div className={`${cssStyles.codeCardContainer}`}>
      <div className={`${cssStyles.codeCardContent}`}>
        <article
          style={{
            background: generateBgGradient(bgGradient),
          }}
          onMouseEnter={onHoverStart}
          onMouseLeave={() => setIsHover(false)}
          onClick={onClick}
          className="group w-full h-full hover:-translate-y-1 rounded-[8vw] sm:rounded-[4vw] lg:rounded-[3vw] overflow-hidden relative shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out"
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
              isHover={isHover}
              pluginIcons={pluginIcons}
              preview={preview}
              icon={codeCardIcon}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default CodeProjectCard;

// Code Card Aspect Ratio: 0.625
// Small Screens: 320w x 200h
// Medium Screens: 360w x 225h
