import React from 'react';
import { Card, CardHeader, CardSeparator } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { userInfoType } from '@/types/account';

export type UserProps = {
  userInfo: userInfoType;
};
export const User = ({ userInfo }: UserProps) => {
  return (
    <Card>
      <CardHeader>
        <span className="flex gap-2 items-center">
          <Icon width={24} height={24} iconName="User" />
          Мої дані
        </span>
        <Link
          href="/profile"
          className="hover:text-main-color"
          title="Мої дані"
        >
          <Icon width={24} height={24} iconName="RoundedRrrowRigth" />
        </Link>
      </CardHeader>
      <CardSeparator />
      <div className="flex gap-2 mb-5 items-center font-semibold text-base leading-tight">
        <Icon width={24} height={24} iconName="Case" />
        {userInfo.name}
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            E-mail:
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {userInfo.email}
          </span>
        </div>

        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Телефон:
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {userInfo.phone}
          </span>
        </div>

        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            ЄДРПОУ:
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {userInfo.edrpou}
          </span>
        </div>

        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Номер договору:
          </span>
          <span className="flex gap-2 items-center font-medium text-sm leading-[1.14] text-main-dark">
            {userInfo.contract}
            <Link
              href="#"
              className="text-main-color hover:text-main-dark"
              title="Договір"
            >
              <Icon width={24} height={24} iconName="Document" />
            </Link>
          </span>
        </div>
      </div>
    </Card>
  );
};
