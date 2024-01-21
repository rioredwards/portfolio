'use client';

import cssStyles from './Modal.module.css';
import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import ExIcon from '@/ui/icons/ExIcon';

interface Props {
  children: React.ReactNode;
}

export function Modal({ children }: Props) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();

      // Handler for clicks outside of the modal
      dialogRef.current?.addEventListener('click', (event) => {
        if (!dialogRef.current) return;

        const rect = dialogRef.current?.getBoundingClientRect();
        const isInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (!isInDialog) {
          dialogRef.current.close();
        }
      });
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const modalRootEl = document.getElementById('modal-root');
  if (!modalRootEl) return null;

  return createPortal(
    <dialog ref={dialogRef} className={cssStyles.modal + ' shadow-lg'} onClose={onDismiss}>
      <div>
        <div className="flex justify-end h-0">
          <button
            autoFocus
            onClick={onDismiss}
            className="h-10 w-10 text-gray-500 hover:bg-gray-100 rounded-full font-bold text-xl mr-4 translate-y-4 p-1 pt-[9px] pl-[9px]"
          >
            <ExIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
        <div className="h-4 bg-white" />
      </div>
    </dialog>,
    modalRootEl
  );
}
