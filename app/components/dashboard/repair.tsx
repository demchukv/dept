import React from 'react';
import { repairType } from '@/types/account';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface RepairProps {
  repair: repairType[];
}
export const Repair = ({ repair }: RepairProps) => {
  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Ремонт техніки
      </p>
      <Separator className="lg:hidden mt-4 mb-2.5 border-gray-light" />
      <table className="table-auto w-full border-collapse">
        <tbody>
          {repair.map((item: repairType) => (
            <>
              <tr key={item.id} className="hidden lg:table-row">
                <td className="font-normal text-sm text-main-dark leading-[1.14] pb-5 w-min pr-2">
                  {format(item.date, 'dd.MM.yyyy')}
                </td>
                <td className="font-medium min-w-[200px] max-w-[200px] text-sm text-main-dark leading-[1.14] pb-5 pr-2 truncate overflow-hidden">
                  {item.title}
                </td>
                <td
                  className={cn(
                    'font-medium text-sm leading-[1.14] pb-5 w-min pr-2',
                    item.state === 'Відправлено' && 'text-warning',
                    item.state === 'Проводимо ремонт' && 'text-main-color',
                    item.state === 'Замовлені комплектуючі' && 'text-attention',
                    item.state === 'Завершено' && 'text-green-additional-color',
                  )}
                >
                  {item.state}
                </td>
                <td className="font-semibold text-sm text-main-dark leading-[1.14] text-right pb-5 w-min whitespace-nowrap">
                  {isNaN(Number(item.amount))
                    ? item.amount
                    : `${Number(item.amount).toFixed(2)} грн`}
                </td>
              </tr>

              <tr key={`${item.id}-m`} className="lg:hidden">
                <td className="py-1.5 min-w-[200px] max-w-[200px] bg-main-lh">
                  <div className="font-medium  text-sm text-main-dark leading-[1.14] truncate overflow-hidden">
                    {item.title}
                  </div>
                  <span
                    className={cn(
                      'font-medium text-sm leading-[1.14]',
                      item.state === 'Відправлено' && 'text-warning',
                      item.state === 'Проводимо ремонт' && 'text-main-color',
                      item.state === 'Замовлені комплектуючі' &&
                        'text-attention',
                      item.state === 'Завершено' &&
                        'text-green-additional-color',
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
                    {isNaN(Number(item.amount))
                      ? item.amount
                      : `${Number(item.amount).toFixed(2)} грн`}
                  </span>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <Separator className="md:hidden mb-4 mt-1.5 border-gray-light lg:hidden" />
      <Link
        href="/repair"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-0 font-semibold text-sm leading-[1.14]"
      >
        Показати всі
      </Link>
    </>
  );
};
