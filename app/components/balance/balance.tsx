'use client';
import React from 'react';
import { Card } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
// import { ReplenishBalanse } from '@/app/components/balance/replenish-balance';

const ReplenishBalanse = dynamic(() =>
  import('@/app/components/balance/replenish-balance').then(
    (mod) => mod.ReplenishBalanse,
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

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
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
        <ReplenishBalanse open={open} onClose={onClose} />
        <Button
          variant={'ghost'}
          title="Повернення коштів"
          className="font-semibold text-main-color  text-sm leading-main-lh"
        >
          Повернення коштів
        </Button>
      </div>
    </Card>
  );
};
