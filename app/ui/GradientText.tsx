'use client';
import cssStyles from './GradientText.module.css';
import { ReactNode, ElementType, CSSProperties, ForwardRefRenderFunction, forwardRef } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

type GradientDirection =
  | 'to top'
  | 'to top right'
  | 'to right'
  | 'to bottom right'
  | 'to bottom'
  | 'to bottom left'
  | 'to left'
  | 'to top left';

interface Props {
  colors: string[];
  children: ReactNode;
  className?: string;
  styles?: CSSProperties;
  elementType?: ElementType;
  direction?: GradientDirection;
  offset?: { x: number; y: number };
  shadowColor?: string;
}

export const GradientText: ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  const {
    colors,
    children,
    className,
    styles,
    elementType: Component = 'span',
    direction = 'to right',
    offset = { x: -2, y: -2 },
    shadowColor = '#000000',
  } = props;

  const inlineStyles: CSSProperties = {
    lineHeight: 1.2,
    position: 'relative',
    ['--offset-x' as any]: `${offset.x}px`,
    ['--offset-y' as any]: `${offset.y}px`,
    ['--gradient-direction' as any]: direction,
    ['--gradient-color-1' as any]: colors[0],
    ['--gradient-color-2' as any]: colors[1],
    ['--shadow-color' as any]: shadowColor,
  };

  return (
    <Component
      ref={ref}
      className={clsx(cssStyles.gradientText, className)}
      style={{ ...inlineStyles, ...styles }}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </Component>
  );
};

const RefGradientText = forwardRef<HTMLDivElement, Props>(GradientText);

export const MotionGradientText = motion(RefGradientText);

export default MotionGradientText;
