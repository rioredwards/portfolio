'use client';
import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNavLink } from './MobileNavLink';
import { MotionContentfulImage } from '@/ui/ContentfulImage';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  avatar: {
    url: string;
  };
}

const menuContainerVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const menuItemVariants = {
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

const avatarVariants = {
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    scale: 1,
    opacity: 1,
    transition: {
      scale: { stiffness: 1000 },
    },
  },
};

const links = [
  {
    text: 'HOME',
    url: '/',
    color: '#FF008C',
  },
  {
    text: 'CODE',
    url: '/',
    color: '#D309E1',
  },
  {
    text: 'ART',
    url: '/',
    color: '#9C1AFF',
  },
  {
    text: 'ABOUT',
    url: '/',
    color: '#7700FF',
  },
  {
    text: 'CONTACT',
    url: '/',
    color: '#4400FF',
  },
];

const MobileNavModal: React.FC<Props> = ({ avatar, isOpen, setIsOpen }) => {
  const closeButtonRef = useRef(null);

  const hideMenu = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      as="div"
      className="z-20"
      initialFocus={closeButtonRef}
      open={isOpen}
      onClose={hideMenu}
    >
      <Dialog.Panel className="z-20 fixed inset-0 w-screen h-screen overflow-hidden bg-white text-center">
        {/* Close Button */}
        <div className="h-20 w-full flex items-center justify-end pr-8">
          <button
            type="button"
            className="h-12 w-12 rounded-full"
            ref={closeButtonRef}
            onClick={hideMenu}
          />
        </div>
        {/* Content */}
        <AnimatePresence>
          <motion.div
            initial={'closed'}
            animate={'open'}
            exit={'closed'}
            variants={menuContainerVariants}
            className="w-full px-8 pb-8"
          >
            {/* Avatar */}
            <motion.div className="w-full flex items-center justify-center">
              <MotionContentfulImage
                variants={avatarVariants}
                alt="Rio Edwards"
                className="object-cover rounded-full"
                height={160}
                width={160}
                src={avatar.url}
              />
            </motion.div>
            {/* Title */}
            <Dialog.Title as="h3" className="mt-2 text-2xl font-bold text-gray-700">
              <motion.span
                variants={menuItemVariants}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                RIO EDWARDS
              </motion.span>
            </Dialog.Title>
            <motion.p variants={menuItemVariants} className="mt-2 text-lg text-gray-500">
              Developer / Designer / Creator
            </motion.p>
            {/* Links */}
            <motion.section className="mt-12 w-full">
              <motion.ul className="w-full flex flex-col items-center gap-4">
                {links.map((link, idx) => (
                  <MobileNavLink
                    key={idx}
                    text={link.text}
                    url={link.url}
                    color={link.color}
                    hideMenu={hideMenu}
                  />
                ))}
              </motion.ul>
            </motion.section>
          </motion.div>
        </AnimatePresence>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileNavModal;
