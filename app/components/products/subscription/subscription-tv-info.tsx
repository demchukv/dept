import { subscriptionType } from '@/types/subscription';
import Link from 'next/link';
import React from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SubscriptionTvItem } from '@/app/components/products/subscription/subscription-tv-item';
import { SubscriptionTvContinue } from '@/app/components/products/subscription/subscription-tv-continue';

interface SubscriptionTvInfoProps {
  data: subscriptionType;
}
export const SubscriptionTvInfo = ({ data }: SubscriptionTvInfoProps) => {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="font-semibold">
          {data.state === 'active' && (
            <>
              Підключені пристрої: {data.devices ? data.devices?.length : '0'}/
              {data.maxDevices ? data.maxDevices : '0'}
            </>
          )}
        </p>
        <p>
          <Link
            href="#"
            className="text-main-color hover:text-main-dark font-semibold"
          >
            Інструкція<span className="hidden sm:inline"> з підключення</span>
          </Link>
        </p>
      </div>
      {(!data.devices || data.devices?.length === 0) &&
        data.state === 'active' && <p>У вас ще немає підключених пристроїв</p>}
      {data.devices && Array.isArray(data.devices) && (
        <Table className="w-full border border-bg-color rounded-[6px]">
          <TableHeader>
            <TableRow>
              <TableHead className=" font-normal text-sm leading-main-lh rounded-tl">
                Назва
              </TableHead>
              <TableHead className=" font-normal text-sm leading-main-lh">
                Остання активність
              </TableHead>
              <TableHead className=" font-normal text-sm leading-main-lhtext-right rounded-tr"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.devices?.map((device) => (
              <SubscriptionTvItem key={device.id} device={device} data={data} />
            ))}
          </TableBody>
        </Table>
      )}
      <SubscriptionTvContinue data={data} />
    </>
  );
};
