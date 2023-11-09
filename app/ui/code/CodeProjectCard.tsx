'use client';
// import Link from 'next/link';
import { CodeCardType, CodeProject } from '@/lib/api';
import { FC, useRef, useState } from 'react';
import CodeCardImage from '@/ui/code/CodeCardImage';
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

const CodeProjectCard: React.FC<CodeProject & { idx: number }> = ({ title, codeCardIcon, idx }) => {
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
    <article
      style={{
        backgroundImage: isHover ? generateBgGradient(bgGradient) : undefined,
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      className={`w-full border-4 border-gray-50/80 hover:border-none hover:-translate-y-2 group relative hover:bg-gray-200 hover:bg-opacity-100 flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer`}
    >
      <CodeModal
        title={title}
        key={title + 'modal'}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onModalClose={onModalClose}
      />
      <div
        style={{ animationDelay: `${idx * 200}ms` }}
        className="group-hover:-z-10 z-0 pointer-events-none absolute inset-0 animate-pulse-3 group-hover:animate-none bg-gray-200/50 group-hover:bg-opacity-0"
      />
      <div className="w-full h-full flex flex-col items-center justify-start">
        <CardComponent
          title={titleLimited}
          color={codeCardIcon?.bgColor}
          isHover={isHover}
          pluginIcons={pluginIcons}
        >
          {codeCardIcon && <CodeCardImage key={title} isHover={isHover} {...codeCardIcon} />}
        </CardComponent>
      </div>
    </article>
  );
};

export default CodeProjectCard;
