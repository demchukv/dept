'use client';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentAccount } from '@/store/account/accountSlice';

import { Card } from '@/app/components/card/card';

export const BalanceDashboard = () => {
  const currentAccount = useAppSelector(selectCurrentAccount);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-[30px]">
      <Card>Баланс</Card>
      <Card>Додані картки</Card>
      <Card>Історія операцій</Card>
      {currentAccount?.account === 'company' && (
        <Card>Рахунки (для компаній)</Card>
      )}
    </div>
  );
};
