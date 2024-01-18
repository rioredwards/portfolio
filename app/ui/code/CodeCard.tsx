'use client';
import cssStyles from '@/ui/code/code.module.css';
import { CodeCard } from '@/lib/api';
import { useRef, useState } from 'react';
import { adjustColor } from '@/utils/colorUtils';
import CodeModal from '@/ui/code/CodeModal';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { MotionCodeCardIcon } from '@/ui/code/CodeCardIcon';
import { MotionCodeCardPreview } from '@/ui/code/CodeCardPreview';
import WebsiteCardIcon from '@/ui/code/WebsiteCardIcon';
import CLICardIcon from '@/ui/code/CLICardIcon';
import PluginCardIcon from '@/ui/code/PluginCardIcon';
import Link from 'next/link';

const MAX_TITLE_LENGTH = 28;

function truncateTitle(title: string) {
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

const codeCardVariants: Variants = {
  isHover: {
    scale: [null, 1.01],
    boxShadow: [null, '2px 8px 18px 0px rgba(0,0,0,0.34)'],
    transition: {
      duration: 0.1,
    },
  },
  isNotHover: {
    scale: 1,
    boxShadow: '1px 3px 6px 0px rgba(0,0,0,0.10)',
    transition: {
      duration: 0.1,
    },
  },
};

const iconVariants: Variants = {
  isNotHover: {
    opacity: [null, 1],
    scale: [null, 1],
    transition: {
      delay: 0.1,
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
  isHover: {
    opacity: [null, 0],
    scale: [null, 0.8],
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
};

const previewVariants: Variants = {
  isHover: {
    opacity: [null, 1],
    transition: {
      duration: 0.1,
      ease: 'easeInOut',
    },
  },
  isNotHover: {
    opacity: [null, 0],
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const CodeProjectCard: React.FC<CodeCard & { idx: number }> = ({
  title,
  type,
  codeCardIcon,
  preview,
  pluginIcon,
  slug,
}) => {
  const hoverDisabled = useRef(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const bgGradient = generateBgGradientColors(codeCardIcon?.bgColor);
  const titleTruncated = truncateTitle(title);
  const [isHover, setIsHover] = useState(false);

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

  const onHoverEnd = () => {
    if (hoverDisabled.current) return;
    setIsHover(false);
  };

  const onClick = () => {
    setIsHover(false);
    hoverDisabled.current = true;
    setModalIsOpen(true);
  };

  const codeCardTypeIcon = () => {
    switch (type) {
      case 'website':
        return <WebsiteCardIcon />;
      case 'plugin':
        if (!pluginIcon) throw new Error(`plugin icon is undefined for ${title}}`);
        return <PluginCardIcon {...pluginIcon} />;
      case 'cli':
        return <CLICardIcon />;
      default:
        return <WebsiteCardIcon />;
    }
  };

  return (
    <Link key={slug} href={`/code/${slug}`} passHref className={`${cssStyles.codeCardContainer}`}>
      {slug}
    </Link>
  );
};

export default CodeProjectCard;
