'use client';

import { CodePreview } from '@/lib/api';
import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import MotionContentfulImage from '@/ui/ContentfulImage';

export const CodeCardPreview: ForwardRefRenderFunction<HTMLDivElement, CodePreview> = (
  props,
  ref
) => {
  const { title, url } = props.preview;

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
        width={200}
        height={160}
        placeholder="blur"
        blurDataURL={url}
      />
    </motion.div>
  );
};

const RefCodeCardPreview = forwardRef<HTMLDivElement, CodePreview>(CodeCardPreview);

export const MotionCodeCardPreview = motion(RefCodeCardPreview);
