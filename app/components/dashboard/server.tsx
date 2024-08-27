import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { serverType } from '@/types/account';

interface serverProps {
  server: serverType[];
}
export const Server = ({ server }: serverProps) => {
  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Сервери і хостинг
      </p>
      <Separator className="lg:hidden mt-4 mb-4 border-gray-light" />
      <div className="grid grid-cols-1 gap-3 lg:gap-5">
        {server.map((item: serverType) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-0.5 lg:grid-cols-2"
          >
            <div className="grid grid-cols-[70%_30%]">
              <div className="font-semibold text-sm text-main-dark leading-main-lh">
                {item.name}
              </div>
              <div className="text-right text-red-700 font-semibold text-sm text-main-dark leading-main-lh">
                {item.brand}
              </div>
            </div>
            <div className="grid grid-cols-[70%_30%] lg:grid-cols-1 lg:gap-5">
              <div className="font-normal text-sm text-main-dark leading-main-lh lg:order-last lg:hidden">
                до {format(item.activeTo, 'yyyy-MM-dd')}
              </div>
              <div className="text-right font-normal text-sm text-main-dark leading-main-lh">
                {!isNaN(Number(item.price))
                  ? `${Number(item.price).toFixed(0)} грн/рік`
                  : item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="md:hidden mb-4 mt-4 border-gray-light lg:hidden" />
      <Link
        href="/server"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-5 font-semibold text-sm leading-main-lh"
      >
        Показати всі
      </Link>
    </>
  );
};
