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
      {children}
      <button autoFocus onClick={onDismiss} className="h-12 w-12 bg-blue-700" />
    </dialog>,
    document.getElementById('modal-root')!
  );
}
