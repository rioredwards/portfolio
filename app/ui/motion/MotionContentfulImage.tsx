import { motion } from 'framer-motion';
import { ForwardRefRenderFunction, forwardRef } from 'react';

import Image from 'next/image';

interface Props {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

const contentfulLoader = ({ src, width, quality }: Props) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const ContentfulImage: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  return <Image ref={ref as any} alt={props.alt} loader={contentfulLoader} {...props} />;
};

const RefContentfulImage = forwardRef<HTMLDivElement, Props>(ContentfulImage);

const MotionContentfulImage = motion(RefContentfulImage);

export default MotionContentfulImage;
