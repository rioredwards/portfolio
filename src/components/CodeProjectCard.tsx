'use client';
import Link from 'next/link';
import { CodeProject } from '@/lib/api';
import { useState } from 'react';
import CodeCardImage from './CodeCardImage';
import { adjustColor } from '@/utils/colorUtils';
import WebsiteCard from './WebsiteCard';
import CLICard from './CLICard';
import HoverGradient from './HoverGradient';

const MAX_TITLE_LENGTH = 28;

function limitTitle(title: string) {
  if (title.length > MAX_TITLE_LENGTH) {
    return title.slice(0, MAX_TITLE_LENGTH) + '...';
  }
  return title;
}

const generateBgGradient = (bgColor: string): string[] => {
  const topRightColor = adjustColor(bgColor, 10, -20);
  const middleColor = bgColor;
  const bottomLeftColor = adjustColor(bgColor, -10, 15);
  // const gradientStr = `linear-gradient(to bottom right, ${topRightColor}, ${middleColor}, ${bottomLeftColor})`;
  return [topRightColor, middleColor, bottomLeftColor];
};

const CodeProjectCard: React.FC<CodeProject> = ({ title, codeCardIcon }) => {
  const [isHover, setIsHover] = useState(false);
  const bgGradient = generateBgGradient(codeCardIcon?.bgColor);
  const titleLimited = limitTitle(title);
  const type = codeCardIcon?.type || 'website';

  return (
    <HoverGradient gradientColors={bgGradient} key={title} classes="rounded-4xl">
      <article
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`w-full group relative flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer`}
      >
        <Link href={`/${title}`} className="w-full h-full flex flex-col items-center justify-start">
          {type === 'website' && (
            <WebsiteCard title={titleLimited}>
              {codeCardIcon && <CodeCardImage key={title} isHover={isHover} {...codeCardIcon} />}
            </WebsiteCard>
          )}
          {type === 'cli' && (
            <CLICard title={titleLimited}>
              {codeCardIcon && <CodeCardImage key={title} isHover={isHover} {...codeCardIcon} />}
            </CLICard>
          )}
        </Link>
      </article>
    </HoverGradient>
  );
};

export default CodeProjectCard;
