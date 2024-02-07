'use client';

import { FC } from 'react';
import { Maximize2, X } from 'lucide-react';
import { Button } from './Button';
import { useRouter } from 'next/navigation';

interface ModalProps {
  modalContainer: string;
  children: React.ReactNode;
  showMax: boolean;
  toggleModal?: any;
}

const Modal: FC<ModalProps> = ({
  modalContainer,
  children,
  showMax,
  toggleModal,
}) => {
  const router = useRouter();
  return (
    <div
      className={`fixed inset-0 bg-slate-50 dark:bg-[#0A0A0A] bg-opacity-30 dark:bg-opacity-20 z-[9999]`}
    >
      <div
        className={`container flex items-center h-full ${modalContainer} justify-center`}
      >
        <div
          className={`relative bg-white dark:bg-[#000000] shadow dark:border border-[#333333] h-fit pt-8 dark:pt-3 pb-8 px-3 rounded-lg`}
        >
          {showMax && (
            <Button
              onClick={toggleModal}
              variant='ghost'
              className='h-6 w-6 p-0 rounded-md absolute top-4 left-3'
              aria-label='toggle modal'
            >
              <Maximize2 className='h-4 w-4' />
            </Button>
          )}
          <Button
            onClick={() => {
              router.back();
            }}
            variant='ghost'
            className='h-6 w-6 p-0 rounded-md absolute top-4 right-3'
            aria-label='close modal'
          >
            <X className='h-4 w-4' />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
