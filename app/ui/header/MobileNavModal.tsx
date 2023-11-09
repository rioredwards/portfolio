'use client';
import { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
}

const MobileNavModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const closeButtonRef = useRef(null);

  return (
    <Dialog
      as="div"
      className="z-10"
      initialFocus={closeButtonRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Panel className="fixed inset-0 w-screen h-screen overflow-hidden bg-white text-center">
        {/* Close Button */}
        <div className="h-20 w-full flex items-center justify-end pr-8">
          <button
            type="button"
            className="h-12 w-12 rounded-full"
            ref={closeButtonRef}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="w-full mt-12 px-8 py-8">
          <Dialog.Title as="h3" className="text-2xl font-bold text-gray-700">
            RIO EDWARDS
          </Dialog.Title>
          <p className="mt-2 text-lg text-gray-500">Developer / Designer / Creator</p>
          {/* Links */}
          <section className="mt-12 w-full flex flex-col items-center gap-4">
            <Link
              className="block w-full py-4 whitespace-nowrap flex-shrink-0 bg-slate-200 rounded-full"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg leading-loose">HOME</span>
            </Link>
            <Link
              className="block w-full py-4 whitespace-nowrap flex-shrink-0 bg-slate-200 rounded-full"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg leading-loose">CODE</span>
            </Link>
            <Link
              className="block w-full py-4 whitespace-nowrap flex-shrink-0 bg-slate-200 rounded-full"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg leading-loose">ART</span>
            </Link>
            <Link
              className="block w-full py-4 whitespace-nowrap flex-shrink-0 bg-slate-200 rounded-full"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg leading-loose">CONTACT</span>
            </Link>
          </section>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default MobileNavModal;
