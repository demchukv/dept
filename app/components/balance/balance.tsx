'use client';
import React from 'react';
import { Card } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent } from '@/app/components/common/modal';
import dynamic from 'next/dynamic';
import { RefundStepOneForm } from '@/app/components/balance/refund-step-one-form';
const ReplenishBalance = dynamic(() =>
  import('@/app/components/balance/replenish-balance').then(
    (mod) => mod.ReplenishBalance,
  ),
);
interface BalanceProps {
  balance: {
    balance: number;
    writeOff: number;
    nextDate: string;
  };
  className?: string;
}
export const Balance = ({ balance, className }: BalanceProps) => {
  const [open, setOpen] = React.useState(false);
  const [openRefund, setOpenRefund] = React.useState(false);

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const onCloseRefund = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpenRefund(state);
  };

  return (
    <Card className={className}>
      <div className="flex flex-col gap-3 mb-4 lg:mb-7">
        <div className="flex justify-between gap-2 items-center">
          <span className="flex gap-2 items-center font-semibold text-base leading-tight">
            <Icon width={24} height={24} iconName="UserBalance" />
            Баланс
          </span>
          <span className="font-semibold text-2xl leading-none">
            {balance.balance.toFixed(2)} грн
          </span>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <span className="flex gap-2 items-center font-semibold text-base leading-tight">
            <Icon width={24} height={24} iconName="BillCheck" />
            Списання
          </span>
          <span className="flex gap-[6px] items-center text-attention font-semibold text-base leading-tight">
            <Icon width={20} height={20} iconName="DangerTriangle" />
            {balance.writeOff.toFixed(2)} грн
          </span>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <span className="flex gap-2 items-center font-semibold text-base leading-tight">
            <Icon width={24} height={24} iconName="Calendar" />
            Наступна дата
          </span>
          <span className="font-semibold text-base leading-tight">
            {balance.nextDate}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse md:justify-between gap-3 items-center">
        <Button className="w-full md:w-auto" onClick={() => setOpen(true)}>
          Поповнити баланс
        </Button>
        <ReplenishBalance open={open} onClose={onClose} />
        <Button
          variant={'ghost'}
          title="Повернення коштів"
          className="font-semibold text-main-color  text-sm leading-main-lh"
          onClick={() => setOpenRefund(true)}
        >
          Повернення коштів
        </Button>
        <Modal
          open={openRefund}
          onOpenChange={() => onCloseRefund(false, undefined)}
        >
          <ModalContent className="grid grid-cols-1 gap-6">
            <RefundStepOneForm onClose={onCloseRefund} />
          </ModalContent>
        </Modal>
      </div>
    </Card>
  );
};
