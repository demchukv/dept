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
  const companyData = {
    id: 12232678,
    name: 'ТОВ Агропромбуд',
    email: 'mail_address@gmail.com',
    phone: '+38(097) 321-65-87',
    edrpou: '3508934009',
    contract: '8490475',
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
  const alertsData = {
    billing: [
      {
        id: 1,
        name: 'Виставлення рахунків',
        push: true,
        email: true,
        telegram: true,
      },
      {
        id: 2,
        name: 'Поповнення',
        push: true,
        email: false,
        telegram: false,
      },
      {
        id: 3,
        name: 'Списання',
        push: true,
        email: true,
        telegram: true,
      },
      {
        id: 4,
        name: 'Попередження низького балансу',
        push: true,
        email: true,
        telegram: false,
      },
      {
        id: 5,
        name: 'Дії зі способами оплати',
        push: false,
        email: false,
        telegram: false,
      },
    ],
    orders: [
      {
        id: 1,
        name: 'Зміна статусу замовлення',
        push: true,
        email: true,
        telegram: false,
      },
    ],
    tasks: [
      {
        id: 1,
        name: 'Нова заявка від колег',
        push: true,
        email: true,
        telegram: false,
      },
      {
        id: 2,
        name: 'Зміна статусу заявки',
        push: true,
        email: true,
        telegram: false,
      },
      {
        id: 3,
        name: 'Протермінування завдань',
        push: true,
        email: true,
        telegram: false,
      },
    ],
    products: [
      {
        id: 1,
        name: 'Закінчується місце на диску',
        push: true,
        email: true,
        telegram: false,
      },
      {
        id: 2,
        name: 'Замовлення нових послуг',
        push: true,
        email: true,
        telegram: false,
      },
    ],
  };
  const alertsGroup = [
    { key: 'billing', head: 'Білінг' },
    { key: 'orders', head: 'Замовлення інтернет магазину' },
    { key: 'tasks', head: 'Задачі / заявки / тікети' },
    { key: 'products', head: 'Мої продукти' },
  ];

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
              <CompanyBaseInfo companyData={companyData} addrData={addrData} />
            )}
          </Card>
          <Card className="flex-grow">
            {currentAccount?.account === 'user' ? (
              <UserFullInfo addrData={addrData} userData={userData} />
            ) : (
              <CompanyFullInfo companyData={companyData} addrData={addrData} />
            )}
          </Card>
        </div>
        <div>
          <AlertSettings alertsData={alertsData} alertsGroup={alertsGroup} />
        </div>
      </div>
    </>
  );
};
