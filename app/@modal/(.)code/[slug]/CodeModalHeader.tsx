'use client';

import Link from 'next/link';
import ExternalLinkIcon from '@/ui/icons/ExternalLinkIcon';
import { ContentfulLink } from '@/lib/api';

interface Props {
  title: string;
  links?: ContentfulLink[];
}

const CodeModalHeader: React.FC<Props> = ({ title, links }) => {
  return (
    <div className="flex justify-start items-center mb-4 mt-6 ml-8">
      <h1
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'instant',
          });
          window.location.reload();
        }}
        className="cursor-pointer hover:text-sky-400 font-bold text-4xl text-gray-600 mb-1 whitespace-nowrap mr-6"
      >
        {title}
      </h1>
      {!!links?.length && (
        <ul className="w-full flex items-center justify-start gap-4 h-6 mt-0.5 align-baseline">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.url}
                target="_blank"
                className="hover:text-white hover:bg-sky-400 text-sky-600 border border-sky-300 rounded-full min-w-[3rem] whitespace-nowrap py-1 px-2 flex items-center justify-center gap-1 cursor-pointer"
              >
                {link.displayText}
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CodeModalHeader;
