'use client';
import Link from 'next/link';
import { CodeCardType, CodeProject } from '@/lib/api';
import { FC, useState } from 'react';
import CodeCardImage from './CodeCardImage';
import { adjustColor } from '@/utils/colorUtils';
import WebsiteCard from './WebsiteCard';
import CLICard from './CLICard';
import PluginCard from './PluginCard';
import CodeModal from '@/components/CodeModal';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const bgGradient = generateBgGradientColors(codeCardIcon?.bgColor);
  const titleLimited = limitTitle(title);
  const CardComponent = CARD_TYPE_MAP[codeCardIcon?.type || 'website'];
  const pluginIcons = codeCardIcon.pluginIconGrayscale
    ? [codeCardIcon.pluginIconGrayscale, codeCardIcon.pluginIconColored]
    : undefined;

  return (
    <article
      style={{
        backgroundImage: isHover ? generateBgGradient(bgGradient) : undefined,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => setModalIsOpen(true)}
      className={`w-full group relative bg-gray-200 flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer`}
    >
      <CodeModal key={title + 'modal'} isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <div
        style={{
          animationDelay: `${idx * 200}ms`,
        }}
        className="group-hover:-z-10 z-0 pointer-events-none absolute inset-0 animate-pulse-2 bg-gray-200"
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
