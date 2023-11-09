'use client';
import { motion, useCycle } from 'framer-motion';
import Hamburger from './Hamburger';

const variants = {
  open: {
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MobileHeader = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.header
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="w-full mx-auto px-8 py-3 flex align-middle justify-between bg-red-100"
    >
      <h1 className="font-semibold text-3xl leading-loose whitespace-nowrap align-middle">
        Rio Edwards
      </h1>
      <Hamburger toggle={() => toggleOpen()} />
    </motion.header>
  );
};
