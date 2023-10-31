'use client';
import Link from 'next/link';
import { CodeCardType, CodeProject } from '@/lib/api';
import { FC, useState } from 'react';
import CodeCardImage from './CodeCardImage';
import { adjustColor } from '@/utils/colorUtils';
import WebsiteCard from './WebsiteCard';
import CLICard from './CLICard';

const MAX_TITLE_LENGTH = 28;

const CARD_TYPE_MAP: Record<CodeCardType, FC<any>> = {
  website: WebsiteCard,
  cli: CLICard,
  plugin: WebsiteCard,
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

const CodeProjectCard: React.FC<CodeProject> = ({ title, codeCardIcon }) => {
  const [isHover, setIsHover] = useState(false);
  const bgGradient = generateBgGradientColors(codeCardIcon?.bgColor);
  const titleLimited = limitTitle(title);
  const CardComponent = CARD_TYPE_MAP[codeCardIcon?.type || 'website'];

  return (
    <article
      style={{ backgroundImage: isHover ? generateBgGradient(bgGradient) : undefined }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`w-full group relative flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer`}
    >
      <Link href={`/${title}`} className="w-full h-full flex flex-col items-center justify-start">
        <CardComponent title={titleLimited} color={codeCardIcon?.bgColor} isHover={isHover}>
          {codeCardIcon && <CodeCardImage key={title} isHover={isHover} {...codeCardIcon} />}
        </CardComponent>
      </Link>
    </article>
  );
};

export default CodeProjectCard;
