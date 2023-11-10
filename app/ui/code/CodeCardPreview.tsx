'use client';

import { CodeProject } from '@/lib/api';
import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import MotionContentfulImage, { ContentfulImage } from '@/ui/ContentfulImage';

interface Props {
  preview: CodeProject['preview'];
}

export const CodeCardPreview: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  const { preview } = props;

  return (
    <motion.div ref={ref} className="overflow-hidden z-10 h-full pointer-events-none">
      <MotionContentfulImage
        className="z-0 absolute h-full w-full"
        alt={preview.title}
        src={preview.url}
        width={200}
        height={160}
      />
    </motion.div>
  );
};

const RefCodeCardPreview = forwardRef<HTMLDivElement, Props>(CodeCardPreview);

export const MotionCodeCardPreview = motion(RefCodeCardPreview);
