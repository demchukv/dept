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

  const userData = {
    id: 12345678,
    name: 'Шевченко Василь Петрович',
    email: 'mail_address@gmail.com',
    phone: '+38 (068) 765-43-21',
    avatar: 'avatar.png',
  };
  const addrData = {
    billing: [
      {
        id: 1,
        addr: 'Ukraine, reg. Kyivska, district Kyiv, 03061, Halana Yaroslava str, 10 - 57',
      },
    ],
    delivery: [
      {
        id: 1,
        addr: 'Ukraine, reg. Kyivska, district Kyiv, 03061, Halana Yaroslava str, 10 - 57',
      },
      {
        id: 2,
        addr: 'Ukraine, reg. Rivnenska, district Rivne, 28075, Shevchenko str. 112 - 92',
      },
    ],
    recipients: [
      {
        id: 1,
        name: 'Олещенко Олег Олексійович',
      },
      {
        id: 2,
        name: 'Коломієць Наталя Дмитрівна',
      },
    ],
  };

  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        {currentAccount?.account === 'user'
          ? 'Мої дані. Персональний акаунт'
          : 'Мої дані. Акаунт компанії'}
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row md-gap-6 items-start">
          <Card className="md:w-2/3">
            {currentAccount?.account === 'user' ? (
              <UserBaseInfo userData={userData} addrData={addrData} />
            ) : (
              <CompanyBaseInfo />
            )}
          </Card>
          <Card className="flex-grow">
            {currentAccount?.account === 'user' ? (
              <UserFullInfo addrData={addrData} userData={userData} />
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
