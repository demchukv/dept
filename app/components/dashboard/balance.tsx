import React from 'react';
import { Card, CardHeader } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface BalanceProps {
  balance: {
    balance: number;
    writeOff: number;
    nextDate: string;
  };
}
export const Balance = ({ balance }: BalanceProps) => {
  return (
    <Card>
      <CardHeader>
        <span className="flex gap-2 items-center">
          <Icon width={24} height={24} iconName="Balans" />
          Баланс
        </span>
        <Link href="/balance" className="hover:text-main-color">
          <Icon width={24} height={24} iconName="RoundedRrrowRigth" />
        </Link>
      </CardHeader>
      <Separator className="my-4" />
      <div className="flex justify-between gap-2 items-center">
        <span className="flex gap-2 items-center">
          <Icon width={24} height={24} iconName="Balans" />
          Баланс
        </span>
        <span>{balance.balance} грн</span>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <span className="flex gap-2 items-center">
          <Icon width={24} height={24} iconName="Balans" />
          Списання
        </span>
        <span className="flex gap-2 items-center">
          <Icon width={20} height={20} iconName="DangerTriangle" />
          {balance.writeOff} грн
        </span>
      </div>
      <div className="flex justify-between gap-2 items-center">
        <span className="flex gap-2 items-center">
          <Icon width={24} height={24} iconName="Balans" />
          Наступна дата
        </span>
        <span>{balance.nextDate}</span>
      </div>
    </Card>
  );
};
