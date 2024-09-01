'use client';

import React from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';

interface ReplenishBalanseFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const ReplenishBalanseForm = ({
  onClose,
}: ReplenishBalanseFormProps) => {
  return (
    <div className="grid grid-cols-1 justify-center gap-6">
      <ModalHeader>
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Поповнити баланс
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div>Form body</div>
      <ModalFooter>Footer with buttons</ModalFooter>
    </div>
  );
};
