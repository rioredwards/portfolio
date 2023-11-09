import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef } from 'react';

interface Props {
  text: string;
}

const Component: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  return (
    <div className="z-40 h-10 w-10 bg-red-500" ref={ref}>
      {props.text}
    </div>
  );
};

const RefComponent = forwardRef<HTMLDivElement, Props>(Component);

const MotionComponent = motion(RefComponent);

export default MotionComponent;
