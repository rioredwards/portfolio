import { ReactNode, ElementType } from 'react';

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
  elementType?: ElementType;
  direction?: GradientDirection;
}

const GradientText: React.FC<Props> = ({
  colors,
  children,
  className,
  elementType: Component = 'span',
  direction = 'to right',
}) => {
  return (
    <Component
      style={{
        background: `linear-gradient(${direction}, ${colors.join(', ')})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1.2,
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default GradientText;
