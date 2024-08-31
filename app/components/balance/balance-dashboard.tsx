'use client';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentAccount } from '@/store/account/accountSlice';

import { Balance } from '@/app/components/balance/balance';
import { BillsList } from '@/app/components/balance/bills-list';
import { OperationHistory } from '@/app/components/balance/operation-history';
import { CardsList } from '@/app/components/balance/cards-list';

export const BalanceDashboard = () => {
  const currentAccount = useAppSelector(selectCurrentAccount);

  const balance = JSON.parse(`{
        "balance": 1200.00,
        "writeOff": 2350.00,
        "nextDate": "01.04.2024"
    }`);

  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4">
        Баланс
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-[30px] place-items-start">
        <div className="w-full grid grid-cols-1 gap-4 lg:gap-[30px]">
          <Balance balance={balance} className="" />
          <OperationHistory className="order-" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:block sm:w-full">
          <CardsList className="sm:mb-4 lg:mb-[30px]" />
          {currentAccount?.account === 'company' && <BillsList className="" />}
        </div>
      </div>
    </>
  );
};
