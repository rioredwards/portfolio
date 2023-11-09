'use client';
import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { MobileNavLink } from './MobileNavLink';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
}

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

const MobileNavModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const closeButtonRef = useRef(null);

  const hideMenu = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      as="div"
      className="z-10"
      initialFocus={closeButtonRef}
      open={isOpen}
      onClose={hideMenu}
    >
      <Dialog.Panel className="fixed inset-0 w-screen h-screen overflow-hidden bg-white text-center">
        {/* Close Button */}
        <div className="h-20 w-full flex items-center justify-end pr-8">
          <button
            type="button"
            className="h-12 w-12 rounded-full"
            ref={closeButtonRef}
            onClick={hideMenu}
          />
        </div>
        <div className="w-full mt-12 px-8 py-8">
          <Dialog.Title as="h3" className="text-2xl font-bold text-gray-700">
            RIO EDWARDS
          </Dialog.Title>
          <p className="mt-2 text-lg text-gray-500">Developer / Designer / Creator</p>
          {/* Links */}
          <section className="mt-12 w-full">
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
          </section>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileNavModal;
