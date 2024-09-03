'use client';

import React from 'react';
import { Modal, ModalContent } from '@/app/components/common/modal';
import { ReplenishBalanceForm } from '@/app/components/balance/replenish-balance-form';

interface ReplenishBalanceProps {
  open: boolean;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const ReplenishBalance = ({ open, onClose }: ReplenishBalanceProps) => {
  return (
    <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
      <ModalContent className="grid grid-cols-1 gap-6">
        <ReplenishBalanceForm onClose={onClose} />
      </ModalContent>
    </Modal>
  );
};
