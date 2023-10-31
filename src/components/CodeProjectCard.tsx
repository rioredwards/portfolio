'use client';
import Link from 'next/link';
import { CodeProject } from '@/lib/api';
import CodeCardContainer from './CodeCardContainer';
import { useState } from 'react';
import CodeCardImage from './CodeCardImage';
import { adjustColor } from '@/utils/colorUtils';

const generateBgGradient = (bgColor: string): string => {
  const topRightColor = adjustColor(bgColor, 10, -20);
  const middleColor = bgColor;
  const bottomLeftColor = adjustColor(bgColor, -10, 15);
  const gradientStr = `linear-gradient(to bottom right, ${topRightColor}, ${middleColor}, ${bottomLeftColor})`;
  return gradientStr;
};

const CodeProjectCard: React.FC<CodeProject> = ({ title, codeCardIcon }) => {
  const [isHover, setIsHover] = useState(false);
  const bgGradient = isHover ? generateBgGradient(codeCardIcon?.bgColor) : undefined;
  const type = codeCardIcon?.type || 'website';

  return (
    <article
      style={{
        backgroundImage: bgGradient,
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`my-1 w-full group bg-slate-50 relative flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer`}
    >
      <Link href={`/${title}`} className="w-full h-full flex flex-col items-center justify-start">
        <CodeCardContainer type={type} title={title}>
          {codeCardIcon && <CodeCardImage key={title} isHover={isHover} {...codeCardIcon} />}
        </CodeCardContainer>
      </Link>
    </article>
  );
};

export default CodeProjectCard;
