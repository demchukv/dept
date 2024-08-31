'use client';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentAccount } from '@/store/account/accountSlice';

export const BalanceDashboard = () => {
  const currentAccount = useAppSelector(selectCurrentAccount);

  return (
    <div>
      <div>Баланс</div>
      <div>Додані картки</div>
      <div>Історія операцій</div>
      {currentAccount?.account === 'company' && (
        <div>Рахунки (для компаній)</div>
      )}
    </div>
  );
};
