'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface Props {
  initialExpandedBox: number;
}

const AnimatedGridColumn: React.FC<Props> = ({ initialExpandedBox }) => {
  const [expandedBox, setExpandedBox] = useState<number | null>(initialExpandedBox);

  const gridBoxCSSClasses = 'bg-gray-200 rounded-2xl w-full min-h-[7rem] shrink';

  const onHoverStart = (boxId: number) => {
    if (expandedBox === boxId) return;
    setExpandedBox(boxId);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <motion.div
        layout
        onHoverStart={() => onHoverStart(1)}
        className={clsx({ 'flex-grow': expandedBox === 1 }, gridBoxCSSClasses)}
      ></motion.div>
      <motion.div
        layout
        onHoverStart={() => onHoverStart(2)}
        className={clsx({ 'flex-grow': expandedBox === 2 }, gridBoxCSSClasses)}
      ></motion.div>
      <motion.div
        layout
        onHoverStart={() => onHoverStart(3)}
        className={clsx({ 'flex-grow': expandedBox === 3 }, gridBoxCSSClasses)}
      ></motion.div>
    </div>
  );
};

export default AnimatedGridColumn;
