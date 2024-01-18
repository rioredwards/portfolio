'use client';

import { CodeCard } from '@/lib/api';
import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import MotionContentfulImage from '@/ui/ContentfulImage';

export const CodeCardPreview: ForwardRefRenderFunction<HTMLDivElement, CodeCard['preview']> = (
  props,
  ref
) => {
  const { title, url } = props;

  return (
    <motion.div
      ref={ref}
      className="group-hover:block top-[18%] left-0 absolute overflow-hidden z-10 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
    >
      <MotionContentfulImage
        className="z-0 relative w-full h-[82%] object-cover"
        alt={title}
        src={url}
        width={475}
        height={243}
      />
    </motion.div>
  );
};

const RefCodeCardPreview = forwardRef<HTMLDivElement, CodeCard['preview']>(CodeCardPreview);

export const MotionCodeCardPreview = motion(RefCodeCardPreview);
