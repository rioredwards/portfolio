import { ReactNode, ElementType } from 'react';

interface Props {
  startColor: string;
  endColor: string;
  children: ReactNode;
  className?: string;
  elementType?: ElementType;
}

const GradientText: React.FC<Props> = ({
  startColor,
  endColor,
  children,
  className,
  elementType: Component = 'span',
}) => {
  return (
    <Component
      style={{
        background: `-webkit-linear-gradient(${startColor}, ${endColor})`,
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
