'use client';
import { AnimatePresence, motion, useCycle } from 'framer-motion';
import Hamburger from './Hamburger';
import MobileNavMenu from './MobileNavMenu';
import MobileNavModal from './MobileNavModal';
import { useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <motion.header
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="w-full mx-auto px-6 s:px-8 py-3 flex align-middle justify-between"
    >
      <h1 className="font-semibold text-3xl leading-loose whitespace-nowrap align-middle">
        RIO EDWARDS
      </h1>
      <Hamburger toggle={toggleOpen} />
      {/* <AnimatePresence>{isOpen && <MobileNavMenu />}</AnimatePresence> */}
      <AnimatePresence>
        <MobileNavModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </AnimatePresence>
    </motion.header>
  );
};
