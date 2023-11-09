import * as React from 'react';
import { motion } from 'framer-motion';

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

const colors = ['#FF008C', '#D309E1', '#9C1AFF', '#7700FF', '#4400FF'];

export const MobileNavBtn = ({ i }: { i: any }) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li
      className="mb-12 flex justify-center items-center cursor-pointer"
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-20 h-20" style={style} />
      <div className="w-20 h-20" style={style} />
    </motion.li>
  );
};
