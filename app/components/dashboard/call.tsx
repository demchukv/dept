import React from 'react';
import { Card, CardHeader, CardSeparator } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { callType } from '@/types/account';

interface callInfoType {
  callInfo: callType;
}
export const Call = ({ callInfo }: callInfoType) => {
  return (
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
      <CardSeparator />
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Вхідні
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {callInfo.incoming}
          </span>
        </div>

        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Вихідні
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {callInfo.outgoing}
          </span>
        </div>

        <div className="flex justify-between lg:justify-start gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Витрати
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {callInfo.total}
          </span>
        </div>

        <div className="flex justify-end gap-2 items-center pt-7 lg:pt-5">
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            <Link href="#" className="text-main-color hover:text-main-dark">
              Журнал дзвінків
            </Link>
          </span>
        </div>
      </div>
    </Card>
  );
};
