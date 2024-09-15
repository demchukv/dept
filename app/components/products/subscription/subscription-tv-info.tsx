import { subscriptionType } from '@/types/subscription';
import Link from 'next/link';
import React from 'react';

interface SubscriptionTvInfoProps {
  data: subscriptionType;
}
export const SubscriptionTvInfo = ({ data }: SubscriptionTvInfoProps) => {
  return (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="font-semibold">
          Підключені пристрої: {data.devices ? data.devices?.length : '0'}/
          {data.maxDevices ? data.maxDevices : '0'}
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
      {data.devices && Array.isArray(data.devices) && (
        <div className="grid grid-cols-3">
          <div>Назва</div>
          <div>Остання активність</div>
          <div>&nbsp;</div>
          {data.devices?.map((device) => (
            <React.Fragment key={device.id}>
              <div
                key={device.id}
                className="flex justify-between items-center text-main-dark font-medium text-sm sm:text-base leading-main-lh"
              >
                {device.title}
              </div>
              <div>{device.lastActivity}</div>
              <div>Відв&#038;язати пристрій</div>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};
