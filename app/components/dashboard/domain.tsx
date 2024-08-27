import React from 'react';
import { domainType } from '@/types/account';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import Link from 'next/link';

interface domainProps {
  domain: domainType[];
}
export const Domain = ({ domain }: domainProps) => {
  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Домени
      </p>
      <Separator className="lg:hidden mt-4 mb-4 border-gray-light" />
      <div className="grid grid-cols-1 gap-3 lg:gap-5">
        {domain.map((item: domainType) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-0.5 lg:grid-cols-2"
          >
            <div className="grid grid-cols-1">
              <div className="col-span-2 font-semibold text-sm text-main-dark leading-main-lh">
                {item.domain}
              </div>
            </div>
            <div className="grid grid-cols-2  lg:gap-5">
              <div className="font-normal text-sm text-main-dark leading-main-lh lg:order-last">
                до {format(item.activeTo, 'yyyy-MM-dd')}
              </div>
              <div className="text-right font-normal text-sm text-main-dark leading-main-lh">
                {Number(item.price).toFixed(0)} грн/рік
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="md:hidden mb-4 mt-4 border-gray-light lg:hidden" />
      <Link
        href="/domain"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-5 font-semibold text-sm leading-main-lh"
      >
        Показати всі
      </Link>
    </>
  );
};
