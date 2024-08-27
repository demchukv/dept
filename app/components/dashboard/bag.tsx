import React from 'react';
import { bagType } from '@/types/account';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface BagProps {
  bag: bagType[];
}
export const Bag = ({ bag }: BagProps) => {
  console.log(bag);
  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Покупки
      </p>
      <Separator className="lg:hidden mt-4 mb-2.5 border-gray-light" />

      {/* <div className="grid grid-cols-1 gap-5">
        {bag.map((item: any) => (
          <div
            key={item.id}
            className="grid grid-flow-col grid-cols-[20%_20%_auto_5%_20%] items-center justify-between"
          >
            <div className="font-normal text-sm text-main-dark leading-[1.14]">
              {format(item.date, 'dd.MM.yyyy')}
            </div>
            <div className="font-medium text-sm text-main-dark leading-[1.14]">
              № {item.number}
            </div>
            <div
              className={cn(
                'font-medium text-sm leading-[1.14]',
                item.state === 'Виконано'
                  ? 'text-green-additional-color'
                  : 'text-attention',
              )}
            >
              {item.state}
            </div>
            <div className="font-medium text-sm leading-[1.14] text-right justify-self-end">
              <Link href="#" className="group">
                <Icon
                  iconName="Doc"
                  width={16}
                  height={16}
                  className="fill-main-color group-hover:fill-main-dark transition-all"
                />
              </Link>
            </div>
            <div className="font-semibold text-sm text-main-dark leading-[1.14] justify-self-end">
              {item.amount.toFixed(2)} грн
            </div>
          </div>
        ))}
      </div> */}
      <table className="table-auto w-full border-collapse">
        <tbody>
          {bag.map((item: any) => (
            <>
              <tr key={item.id} className="hidden lg:table-row">
                <td className="font-normal text-sm text-main-dark leading-[1.14] pb-5">
                  {format(item.date, 'dd.MM.yyyy')}
                </td>
                <td className="font-medium text-sm text-main-dark leading-[1.14] pb-5">
                  № {item.number}
                </td>
                <td
                  className={cn(
                    'font-medium text-sm leading-[1.14] pb-5',
                    item.state === 'Виконано'
                      ? 'text-green-additional-color'
                      : 'text-attention',
                  )}
                >
                  {item.state}
                </td>
                <td className="font-medium text-sm leading-[1.14] pb-5 text-right w-7">
                  <Link href="#" className="group">
                    <Icon
                      iconName="Doc"
                      width={16}
                      height={16}
                      className="fill-main-color group-hover:fill-main-dark transition-all"
                    />
                  </Link>
                </td>
                <td className="font-semibold text-sm text-main-dark leading-[1.14] text-right pb-5">
                  {item.amount.toFixed(2)} грн
                </td>
              </tr>

              <tr key={`${item.id}-m`} className="lg:hidden">
                <td className="py-1.5">
                  <span className="font-medium text-sm text-main-dark leading-[1.14]">
                    № {item.number}
                  </span>
                  <br />
                  <span
                    className={cn(
                      'font-medium text-sm leading-[1.14]',
                      item.state === 'Виконано'
                        ? 'text-green-additional-color'
                        : 'text-attention',
                    )}
                  >
                    {item.state}
                  </span>
                </td>
                <td className="py-1.5 text-right">
                  <span className="font-normal text-sm text-main-dark leading-[1.14]">
                    {format(item.date, 'dd.MM.yyyy')}
                  </span>
                  <br />
                  <span className="font-semibold text-sm text-main-dark leading-[1.14] text-right w-min">
                    {item.amount.toFixed(2)} грн
                  </span>
                </td>
                <td className="py-1.5 text-right w-10">
                  <Link href="#" className="group">
                    <Icon
                      iconName="Doc"
                      width={24}
                      height={24}
                      className="fill-main-color group-hover:fill-main-dark transition-all w-6 h-6 ml-4 flex-shrink-0"
                    />
                  </Link>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <Separator className="md:hidden mb-4 mt-2.5 border-gray-light lg:hidden" />
      <Link
        href="/bag"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-0 font-semibold text-sm leading-[1.14]"
      >
        Показати всі
      </Link>
    </>
  );
};
