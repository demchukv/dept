import React from 'react';
import { Card, CardHeader } from '@/app/components/card/card';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Balance } from '@/app/components/dashboard/balance';
//TODO: load data from API
import { getJson } from '@/data/get-json';

export const Dashboard = async () => {
  //TODO: load data from API
  const data = await getJson('/data/dashboard.json');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 md:gap-5 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
        <Balance balance={data.balance} />
        <Card>
          <CardHeader>
            <span className="flex gap-2 items-center">
              <Icon width={24} height={24} iconName="Call" />
              Телефонія
            </span>
            <Link href="/my-numbers" className="hover:text-main-color">
              <Icon width={24} height={24} iconName="RoundedRrrowRigth" />
            </Link>
          </CardHeader>
          <Separator className="my-4" />
        </Card>
        <Card>
          <CardHeader>
            <span className="flex gap-2 items-center">
              <Icon width={24} height={24} iconName="User" />
              Мої дані
            </span>
            <Link href="/profile" className="hover:text-main-color">
              <Icon width={24} height={24} iconName="RoundedRrrowRigth" />
            </Link>
          </CardHeader>
          <Separator className="my-4" />
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <Card>Покупки</Card>
        <Card>Підписки</Card>
      </div>
    </div>
  );
};
