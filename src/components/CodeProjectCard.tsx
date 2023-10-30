'use client';
// import { base64StrPngFromGif } from 'gif-png-converter';
import Link from 'next/link';
import { CodeProject } from '@/lib/api';
import CodeCardContainer from './CodeCardContainer';
import { useState } from 'react';
import CodeCardImage from './CodeCardImage';

const CodeProjectCard: React.FC<CodeProject> = ({ title, codeCardIcon }) => {
  const [isHover, setIsHover] = useState(false);
  const type = codeCardIcon?.type || 'website';

  return (
    <article
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="my-1 w-full group hover:bg-gradient-to-br from-cyan-200 to-blue-300 bg-slate-50 relative flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer"
    >
      <Link href={`/${title}`} className="w-full h-full flex flex-col items-center justify-start">
        <CodeCardContainer type={type}>
          {codeCardIcon && <CodeCardImage key={title} isHover={isHover} {...codeCardIcon} />}
        </CodeCardContainer>
      </Link>
    </article>
  );
};

export default CodeProjectCard;
