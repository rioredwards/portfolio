'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  src: string;
  width?: number;
  quality?: number;
  [key: string]: any; // For other props that might be passed
}

const contentfulLoader = ({ src, width, quality }: Props) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default function ContentfulImage(props: Props) {
  return <Image alt={props.alt} loader={contentfulLoader} {...props} />;
}

const RefContentfulImage = forwardRef<HTMLDivElement, Props>(ContentfulImage);

export const MotionContentfulImage = motion(RefContentfulImage);
