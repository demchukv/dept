import React from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { cn } from '@/lib/utils';

interface ModalLoadingProps {
  children: React.ReactNode;
  type?: string;
}
export const ModalLoading = ({ children, type }: ModalLoadingProps) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle className="hidden"></ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div
        className={cn(
          'h-full w-full grid place-items-center text-2xl',
          type === 'loading' && 'text-main-color',
          type === 'error' && 'text-red-500',
        )}
      >
        {children}
      </div>
      <ModalFooter className="hidden"></ModalFooter>
    </>
  );
};
