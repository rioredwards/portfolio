import Link from 'next/link';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import clsx from 'clsx';

interface Props {
  text: string;
  style: 'link' | 'tag';
  size?: 'small' | 'medium' | 'large';
  href?: string;
}

const Chip: React.FC<Props> = ({ text, style, size, href }) => {
  const baseClasses =
    'rounded-full whitespace-nowrap flex items-center justify-center cursor-pointer';

  const sizeClasses = clsx({
    'min-w-[3rem] py-[0.2rem] px-2 text-xs': size === 'small',
    'min-w-[4rem] py-1 px-3 text-base': size === 'medium',
    'min-w-[5rem] py-1.5 px-3 text-lg': size === 'large',
  });

  if (style === 'tag') {
    const tagClasses = clsx('hover:bg-gray-400 bg-gray-500 text-white');

    return <span className={clsx(baseClasses, sizeClasses, tagClasses)}>{text}</span>;
  }

  if (style === 'link') {
    if (!href) {
      throw new Error('href is required for style link');
    }

    const linkClasses = clsx(
      'hover:text-white hover:bg-sky-400 text-sky-600 border border-sky-300 rounded-full gap-1'
    );

    const iconClasses = clsx({
      'h-3 w-3': size === 'small',
      'h-4 w-4': size === 'medium',
      'h-5 w-5': size === 'large',
    });

    return (
      <Link href={href} target="_blank" className={clsx(baseClasses, sizeClasses, linkClasses)}>
        {text}
        <ExternalLinkIcon className={iconClasses} />
      </Link>
    );
  }

  throw new Error('style must be either link or tag');
};

export default Chip;
