'use client';
import { motion } from 'framer-motion';
import Hamburger from './Hamburger';
import MobileNavModal from './MobileNavMenu';
import { useState } from 'react';

interface Props {
  avatar: {
    url: string;
  };
  className: string;
}

export const MobileHeader: React.FC<Props> = ({ avatar, className: cssClasses }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <motion.header
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className={`w-full mx-auto px-4 py-3 flex align-middle justify-between ${cssClasses}`}
    >
      <h1 className="font-semibold text-2xl leading-loose whitespace-nowrap align-middle text-gray-800">
        RIO EDWARDS
      </h1>
      <Hamburger toggle={toggleOpen} />
      <MobileNavModal avatar={avatar} isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.header>
  );
};
