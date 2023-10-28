'use client';
// import { base64StrPngFromGif } from 'gif-png-converter';
import Link from 'next/link';
import { CodeProject } from '@/lib/api';
import CodeCardContainer from './CodeCardContainer';
import ContentfulImage from '../lib/contentful-image';
import { useState } from 'react';

const CodeProjectCard: React.FC<CodeProject> = ({ title, codeCardIcon }) => {
  const [isHover, setIsHover] = useState(false);
  const type = codeCardIcon?.type || 'website';
  const image = isHover ? codeCardIcon?.iconColored.url : codeCardIcon?.iconGrayscale.url;

  return (
    <article
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="my-1 w-full group hover:bg-gradient-to-br from-cyan-200 to-blue-300 bg-slate-50 border-solid border-8 border-gray-300 relative flex flex-col items-center h-[260px] overflow-hidden rounded-4xl hover:shadow-lg cursor-pointer"
    >
      <Link href={`/${title}`} className="w-full h-full flex flex-col items-center justify-start">
        <CodeCardContainer type={type}>
          {codeCardIcon && (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <ContentfulImage src={image} alt={codeCardIcon.title} height={150} width={150} />
            </div>
          )}
        </CodeCardContainer>
      </Link>
    </article>
  );
};

export default CodeProjectCard;
