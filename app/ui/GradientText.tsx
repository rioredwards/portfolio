import cssStyles from './GradientText.module.css';
import { ReactNode, ElementType, CSSProperties } from 'react';
import clsx from 'clsx';

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

const GradientText: React.FC<Props> = ({
  colors,
  children,
  className,
  styles,
  elementType: Component = 'span',
  direction = 'to right',
  offset = { x: -2, y: -2 },
  shadowColor = '#000000',
}) => {
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
      className={clsx(cssStyles.gradientText, className)}
      style={{ ...inlineStyles, ...styles }}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </Component>
  );
};

export default GradientText;
