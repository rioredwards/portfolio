'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';
import Image from 'next/image';

interface Props {
  initialExpandedBox: number;
  columnNum: number;
}

const artCardContainerVariants: Variants = {
  isHover: {
    height: [null, 300],
    transition: {
      duration: 0.3,
    },
  },
  isNotHover: {
    height: [null, 170],
    transition: {
      duration: 0.3,
    },
  },
};

const AnimatedGridColumn: React.FC<Props> = ({ initialExpandedBox, columnNum }) => {
  const [expandedBox, setExpandedBox] = useState<number | null>(initialExpandedBox);

  const gridBoxCSSClasses = 'bg-gray-200 rounded-2xl w-full overflow-hidden';

  const onHoverStart = (boxId: number) => {
    if (expandedBox === boxId) return;
    setExpandedBox(boxId);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <motion.div layout onHoverStart={() => onHoverStart(1)} className={clsx(gridBoxCSSClasses)}>
        <motion.img
          initial={false}
          animate={expandedBox === 1 ? 'isHover' : 'isNotHover'}
          variants={artCardContainerVariants}
          src="/Temp/1.png"
          alt="img"
          className="w-full object-cover"
        />
      </motion.div>
      <motion.div layout onHoverStart={() => onHoverStart(2)} className={clsx(gridBoxCSSClasses)}>
        <motion.img
          initial={false}
          animate={expandedBox === 2 ? 'isHover' : 'isNotHover'}
          variants={artCardContainerVariants}
          src="/Temp/1.png"
          alt="img"
          className="w-full object-cover"
        />
      </motion.div>
      <motion.div layout onHoverStart={() => onHoverStart(3)} className={clsx(gridBoxCSSClasses)}>
        <motion.img
          initial={false}
          animate={expandedBox === 3 ? 'isHover' : 'isNotHover'}
          variants={artCardContainerVariants}
          src="/Temp/1.png"
          alt="img"
          className="w-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedGridColumn;
