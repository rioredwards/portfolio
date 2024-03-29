'use client';
import { motion } from 'framer-motion';
import Hamburger from '../../icons/Hamburger';
import MobileNavModal from './MobileNavMenu';
import { useState } from 'react';
import Link from 'next/link';

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
      className={`fixed top-0 left-0 z-40 w-full bg-white/80 backdrop-blur-lg mx-auto px-4 py-3 flex align-middle justify-between ${cssClasses}`}
    >
      <Link href="/">
        <h1 className="font-semibold text-2xl leading-loose whitespace-nowrap align-middle text-gray-800">
          RIO EDWARDS
        </h1>
      </Link>

      <Hamburger toggle={toggleOpen} />
      <MobileNavModal avatar={avatar} isOpen={isOpen} setIsOpen={setIsOpen} />
    </motion.header>
  );
};
