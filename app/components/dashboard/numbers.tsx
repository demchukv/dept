import React from 'react';
import { numbersType } from '@/types/account';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';

interface NumbersProps {
  numbers: numbersType[];
}
export const Numbers = ({ numbers }: NumbersProps) => {
  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Номери
      </p>
      <Separator className="lg:hidden mt-4 mb-4 border-gray-light" />
      <div className="grid grid-cols-1 gap-3 lg:gap-5">
        {numbers.map((item: numbersType) => (
          <div
            key={item.id}
            className="grid grid-cols-[120px_auto] lg:grid-cols-[60px_calc(100%_-_68px)] gap-2 justify-between lg:justify-start items-center"
          >
            <div className="grid grid-cols-1 gap-0.5 items-center">
              <div
                className={cn(
                  'flex justify-center items-center w-12 font-semibold text-sm text-white leading-[1.33] rounded',
                  item.type === 'sip' && 'bg-orange-additional-color',
                  item.type === 'sim' && 'bg-green-additional-color',
                )}
              >
                {item.type}
              </div>
              <div className="font-normal text-sm text-main-dark leading-main-lh lg:hidden">
                до {format(item.activeTo, 'yyyy-MM-dd')}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-0.5 lg:grid-cols-[4fr_1fr] lg:justify-between lg:gap-2 items-center">
              <div className="text-right lg:text-left font-semibold text-sm text-main-dark leading-main-lh">
                {item.number}
              </div>
              <div className="text-right font-normal text-sm text-main-dark leading-main-lh">
                {Number(item.price).toFixed(0)} грн/міс
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="md:hidden mb-4 mt-4 border-gray-light lg:hidden" />
      <Link
        href="/my-numbers"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-5 font-semibold text-sm leading-main-lh"
      >
        Показати всі
      </Link>
    </>
  );
};
