import { CodeProject } from '@/lib/api';
import { MotionSVGFromUrl } from '@/ui/code/SVGFromUrl';
import { ForwardRefRenderFunction, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
  icon: CodeProject['codeCardIcon'];
}

export const CodeCardIcon: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  const { icon } = props;

  return (
    <motion.div
      ref={ref}
      className="absolute top-[35%] left-0 z-10 h-full w-full flex flex-col items-center justify-center pointer-events-none drop-shadow-xl"
    >
      <MotionSVGFromUrl
        key={icon.title + 'colored'}
        title={icon.title}
        url={icon.image.url}
        containerClasses="z-10 h-[50%] w-full pointer-events-none flex flex-col items-center justify-center"
        animation={icon.animation}
      />
    </motion.div>
  );
};

const RefCodeCardIcon = forwardRef<HTMLDivElement, Props>(CodeCardIcon);

export const MotionCodeCardIcon = motion(RefCodeCardIcon);
