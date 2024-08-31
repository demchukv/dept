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
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-[30px]"> */}
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:gap-[30px] items-start">
        <Balance
          balance={balance}
          className="sm:max-w-[calc(50%-8px)] lg:max-w-[calc(50%-15px)]"
        />
        <CardsList className="sm:max-w-[calc(50%-8px)] lg:max-w-[calc(50%-15px)]" />
        <OperationHistory className="sm:max-w-[calc(50%-8px)] lg:max-w-[calc(50%-15px)]" />
        {currentAccount?.account === 'company' && (
          <BillsList className="sm:max-w-[calc(50%-8px)] lg:max-w-[calc(50%-15px)]" />
        )}
      </div> */}
      {/* <div className="">
        <Balance
          balance={balance}
          className="block float-start mb-4 lg:mb-[30px] sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]"
        />
        <CardsList className="block float-start mb-4 lg:mb-[30px]  ml-4 lg:ml-[30px] sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]" />
        <OperationHistory className="block float-start mb-4 lg:mb-[30px]  ml-4 lg:ml-[30px] sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]" />
        {currentAccount?.account === 'company' && (
          <BillsList className="block float-start  sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]" />
        )}
      </div> */}
      <div className="flex flex-row flex-wrap gap-4 lg:gap-[30px] sm:flex-row sm:flex-wrap items-start justify-start">
        <Balance
          balance={balance}
          className="sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]"
        />
        <CardsList className="sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]" />
        <OperationHistory className="sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]" />
        {currentAccount?.account === 'company' && (
          <BillsList className="sm:w-[calc(50%-8px)] lg:w-[calc(50%-15px)]" />
        )}
      </div>
    </>
  );
};
