'use client';
import React, { useRef, useState } from 'react';

const HoverButton = () => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [coords, setCoords] = useState({ x: '0px', y: '0px', size: '0px' });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px`, size: '200px' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x: `${x}px`, y: `${y}px`, size: '0px' });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        background: '#7983ff',
        padding: '0.5rem 1rem',
        fontSize: '1.2rem',
        color: 'white',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <span>Hover me</span>
      <div
        style={{
          position: 'absolute',
          left: coords.x,
          top: coords.y,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle closest-side, pink, transparent)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </button>
  );
};

export default HoverButton;
