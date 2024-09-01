'use client';

import React from 'react';
import { Modal, ModalContent } from '@/app/components/common/modal';
import { ReplenishBalanseForm } from '@/app/components/balance/replenish-balance-form';

interface ListOfDocsProps {
  open: boolean;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const ReplenishBalanse = ({ open, onClose }: ListOfDocsProps) => {
  return (
    <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
      <ModalContent className="grid grid-cols-1 gap-6">
        <div>
          <ReplenishBalanseForm onClose={onClose} />
        </div>
      </ModalContent>
    </Modal>
  );
};
