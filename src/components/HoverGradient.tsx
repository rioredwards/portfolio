'use client';
import { MouseEvent, useRef, useState } from 'react';

interface HoverGradientProps {
  color?: string;
  style?: React.CSSProperties;
  classes?: string;
}

const HoverGradient: React.FC<HoverGradientProps> = ({ color = '#FF560D', style, classes }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: '0px', y: '0px', size: '0px' });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px`, size: '1200px' });
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
      <div
        style={{
          position: 'absolute',
          minHeight: '200px',
          minWidth: '200px',
          left: coords.x,
          top: coords.y,
          background: `radial-gradient(circle closest-side, ${color}, transparent)`,
          transform: 'translate(-50%, -50%)',
        }}
        className="w-96 h-96"
      />
    </div>
  );
};

export default HoverGradient;
