import { CodeCard as CodeCardType } from '@/lib/dataTypes';
import { MotionSVGFromUrl } from '@/ui/code/SVGFromUrl';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { motion } from 'framer-motion';

export const CodeCardIcon: ForwardRefRenderFunction<
  HTMLDivElement,
  CodeCardType['codeCardIcon']
> = (props, ref) => {
  const { animation, image } = props;

  return (
    <motion.div
      ref={ref}
      className="absolute top-[35%] left-0 z-10 h-full w-full flex flex-col items-center justify-center pointer-events-none drop-shadow-xl"
    >
      <MotionSVGFromUrl
        title={image.title}
        url={image.url}
        containerClasses="z-10 h-[50%] w-full pointer-events-none flex flex-col items-center justify-center"
        animation={animation}
      />
    </motion.div>
  );
};

const RefCodeCardIcon = forwardRef<HTMLDivElement, CodeCardType['codeCardIcon']>(CodeCardIcon);

export const MotionCodeCardIcon = motion(RefCodeCardIcon);
