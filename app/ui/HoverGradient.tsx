import { MouseEvent, useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface HoverGradientProps {
  radius?: number;
  color?: string;
  style?: React.CSSProperties;
  classes?: string;
}

const HoverGradient: React.FC<HoverGradientProps> = ({
  radius = 200,
  color = '#FF560D',
  style,
  classes,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const springX = useSpring(x, { stiffness: 50, damping: 5 });
  const springY = useSpring(y, { stiffness: 50, damping: 5 });

  useEffect(() => {
    if (springX.get() !== x) springX.set(x);
    if (springX.get() !== y) springY.set(y);
  }, [x, y, springX, springY]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setX(e.clientX - rect.left);
    setY(e.clientY - rect.top);
  };

  return (
    <div
      className={classes}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        overflow: 'hidden',
        ...style,
      }}
    >
      <motion.div
        style={{
          height: `${radius}px`,
          width: `${radius}px`,
          left: springX,
          top: springY,
          background: `radial-gradient(circle closest-side, ${color}, transparent)`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute w-96 h-96"
      />
    </div>
  );
};

export default HoverGradient;
