import React from 'react';
import { taskType } from '@/types/account';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskProps {
  task: taskType[];
}

export const Task = ({ task }: TaskProps) => {
  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Заявки/задачі
      </p>
      <Separator className="lg:hidden mt-4 mb-2.5 border-gray-light" />
      <table className="table-auto w-full border-collapse">
        <tbody>
          {task.map((item: any) => (
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
                    item.state === 'В роботі' && 'text-main-color',
                    item.state === 'На паузі' && 'text-attention',
                    item.state === 'Завершено' && 'text-green-additional-color',
                  )}
                >
                  {item.state}
                </td>
                <td className="font-semibold text-sm text-main-dark leading-[1.14] text-right pb-5 w-min whitespace-nowrap">
                  {isNaN(item.amount)
                    ? item.amount
                    : `${item.amount.toFixed(2)} грн`}
                </td>
              </tr>

              <tr key={`${item.id}-m`} className="lg:hidden">
                <td className="py-1.5 min-w-[100px] max-w-[200px]">
                  <div className="font-medium  text-sm text-main-dark leading-[1.14] truncate overflow-hidden">
                    {item.title}
                  </div>
                  <span
                    className={cn(
                      'font-medium text-sm leading-[1.14]',
                      item.state === 'В роботі' && 'text-main-color',
                      item.state === 'На паузі' && 'text-attention',
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
                    {isNaN(item.amount)
                      ? item.amount
                      : `${item.amount.toFixed(2)} грн`}
                  </span>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <Separator className="md:hidden mb-4 mt-1.5 border-gray-light lg:hidden" />
      <Link
        href="/task"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-0 font-semibold text-sm leading-[1.14]"
      >
        Показати всі
      </Link>
    </>
  );
};
