'use client';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentAccount } from '@/store/account/accountSlice';
import { Card } from '@/app/components/card/card';
import { UserBaseInfo } from '@/app/components/profile/user-base-info';
import { CompanyBaseInfo } from '@/app/components/profile/company-base-info';
import { UserFullInfo } from '@/app/components/profile/user-full-info';
import { CompanyFullInfo } from '@/app/components/profile/company-full-info';
import { AlertSettings } from '@/app/components/profile/alert-settings';

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
          <Card className="md:w-2/3">
            {currentAccount?.account === 'user' ? (
              <UserBaseInfo />
            ) : (
              <CompanyBaseInfo />
            )}
          </Card>
          <Card className="flex-grow">
            {currentAccount?.account === 'user' ? (
              <UserFullInfo />
            ) : (
              <CompanyFullInfo />
            )}
          </Card>
        </div>
        <div>
          <AlertSettings />
        </div>
      </div>
    </>
  );
};
