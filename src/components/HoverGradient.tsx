'use client';
import { ReactNode, MouseEvent, useRef, useState } from 'react';

interface HoverGradientProps {
  children?: ReactNode;
  gradientColors?: string[];
  style?: React.CSSProperties;
  classes?: string;
}

const HoverGradient: React.FC<HoverGradientProps> = ({
  children,
  gradientColors = ['#9CE1A0', '#0D99FF', '#FF900D'],
  style,
  classes,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: '0px', y: '0px', size: '0px' });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px`, size: '1200px' });
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px`, size: '0px' });
  };

  return (
    <div
      className={classes}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        ...style,
      }}
    >
      {children || <span>Hover me</span>}
      <div
        style={{
          backgroundColor: gradientColors[2],
          transform: 'translateY(-100%)',
        }}
        className="-z-10 w-full h-full absolute"
      />
      <div
        style={{
          zIndex: -1,
          position: 'absolute',
          minHeight: '200px',
          minWidth: '200px',
          left: coords.x,
          top: coords.y,
          background: `radial-gradient(circle closest-side, ${gradientColors[0]}, ${gradientColors[1]}, transparent)`,
          transform: 'translate(-50%, -50%)',
        }}
        className="w-96 h-96"
      />
    </div>
  );
};

export default HoverGradient;
