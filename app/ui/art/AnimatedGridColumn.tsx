'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import ArtCardTitle from './ArtCardTitle';

interface Props {
  initialExpandedBox: number;
  imgUrls: string[];
}

const Spring = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
};

const artCardContainerVariants: Variants = {
  isHover: {
    height: [null, 300],
    filter: [null, 'none'],
    transition: Spring,
  },
  isNotHover: {
    height: [null, 170],
    filter: [null, 'blur(4px) opacity(0.8)'],
    transition: Spring,
  },
};

const AnimatedGridColumn: React.FC<Props> = ({ initialExpandedBox, imgUrls }) => {
  const [expandedBox, setExpandedBox] = useState<number | null>(initialExpandedBox);

  if (imgUrls.length !== 3) throw new Error('imgUrls must be length 3');

  const gridBoxCSSClasses = 'relative w-full bg-gray-200 rounded-2xl overflow-hidden';

  const width = 'w-80';

  const onHoverStart = (boxId: number) => {
    if (expandedBox === boxId) return;
    setExpandedBox(boxId);
  };

  return (
    <div className={clsx(width, 'h-full flex flex-col items-center justify-center gap-4')}>
      <motion.div layout onHoverStart={() => onHoverStart(1)} className={clsx(gridBoxCSSClasses)}>
        <motion.img
          initial={false}
          animate={expandedBox === 1 ? 'isHover' : 'isNotHover'}
          variants={artCardContainerVariants}
          src={imgUrls[0]}
          alt="img"
          className="w-full object-cover"
        />
        <ArtCardTitle title="Title" width={width} isExpanded={expandedBox === 1} />
      </motion.div>
      <motion.div layout onHoverStart={() => onHoverStart(2)} className={clsx(gridBoxCSSClasses)}>
        <motion.img
          initial={false}
          animate={expandedBox === 2 ? 'isHover' : 'isNotHover'}
          variants={artCardContainerVariants}
          src={imgUrls[1]}
          alt="img"
          className="w-full object-cover"
        />
        <ArtCardTitle title="Title" width={width} isExpanded={expandedBox === 2} />
      </motion.div>
      <motion.div layout onHoverStart={() => onHoverStart(3)} className={clsx(gridBoxCSSClasses)}>
        <motion.img
          initial={false}
          animate={expandedBox === 3 ? 'isHover' : 'isNotHover'}
          variants={artCardContainerVariants}
          src={imgUrls[2]}
          alt="img"
          className="w-full object-cover"
        />
        <ArtCardTitle title="Title" width={width} isExpanded={expandedBox === 3} />
      </motion.div>
    </div>
  );
};

export default AnimatedGridColumn;
