'use client';

import { CodeProject } from '@/lib/api';
import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import MotionContentfulImage from '@/ui/ContentfulImage';

interface Props {
  preview: CodeProject['preview'];
}

export const CodeCardPreview: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  const { preview } = props;

  return (
    <motion.div
      ref={ref}
      className="group-hover:block top-[18%] left-0 absolute overflow-hidden z-10 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
    >
      <MotionContentfulImage
        className="z-0 relative w-full h-[82%] object-cover"
        alt={preview.title}
        src={preview.url}
        width={200}
        height={160}
        placeholder="blur"
        blurDataURL={preview.url}
      />
    </motion.div>
  );
};

const RefCodeCardPreview = forwardRef<HTMLDivElement, Props>(CodeCardPreview);

export const MotionCodeCardPreview = motion(RefCodeCardPreview);
