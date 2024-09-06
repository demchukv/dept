'use client';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentAccount } from '@/store/account/accountSlice';
import { Card } from '@/app/components/card/card';

export const Profile = () => {
  const currentAccount = useAppSelector(selectCurrentAccount);
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        {currentAccount?.account === 'user'
          ? 'Мої дані. Персональний акаунт'
          : 'Мої дані. Акаунт компанії'}
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md-gap-6">
          <Card className="md:w-2/3">Base info</Card>
          <Card className="flex-grow">Full info</Card>
        </div>
        <div>Set alerts</div>
      </div>
    </>
  );
};
