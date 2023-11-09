import * as React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Props {
  text: string;
  url: string;
  color: string;
  hideMenu: Function;
}

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MobileNavLink: React.FC<Props> = ({ text, url, hideMenu, color }) => {
  const borderStyle = { border: `2px solid ${color}` };

  return (
    <motion.li
      className="block w-full rounded-full"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={borderStyle}
    >
      <Link
        className="block w-full h-full cursor-pointer whitespace-nowrap bg-slate-100 rounded-full"
        href={url}
        onClick={() => hideMenu()}
      >
        <span className="text-lg leading-loose">{text}</span>
      </Link>
    </motion.li>
  );
};
