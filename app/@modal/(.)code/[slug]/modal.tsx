'use client';

import cssStyles from './Modal.module.css';
import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
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

  return createPortal(
    <dialog ref={dialogRef} className={cssStyles.modal} onClose={onDismiss}>
      <div className="p-4">
        <div className="flex justify-end">
          <button
            autoFocus
            onClick={onDismiss}
            className="h-6 w-6 text-gray-500 bg-gray-100 rounded-full font-black"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  );
}
