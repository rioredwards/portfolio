'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Hamburger from './Hamburger';
import MobileNavModal from './MobileNavModal';
import { useState } from 'react';

interface Props {
  avatar: {
    url: string;
  };
}

export const MobileHeader: React.FC<Props> = ({ avatar }) => {
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
      <MobileNavModal avatar={avatar} isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.header>
  );
};
