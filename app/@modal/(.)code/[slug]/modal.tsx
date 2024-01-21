'use client';

import cssStyles from './Modal.module.css';
import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import ExIcon from '@/ui/icons/ExIcon';
import CodeModalHeader from './CodeModalHeader';
import { ContentfulLink } from '@/lib/api';

interface Props {
  children: React.ReactNode;
  projectTitle: string;
  projectLinks?: ContentfulLink[];
}

export function Modal({ children, projectTitle, projectLinks }: Props) {
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
        <CodeModalHeader title={projectTitle} links={projectLinks} />
        {children}
        <div className="h-4 bg-white" />
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  );
}
