'use client';
import React from 'react';
import { bagType } from '@/types/account';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { TooltipShow } from '@/app/components/common/tooltip-show';
import { Modal, ModalContent } from '@/app/components/common/modal';
import { ListOfDocs } from '@/app/components/bag/list-of-docs';

interface BagProps {
  bag: bagType[];
}
export const Bag = ({ bag }: BagProps) => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<number | null>(null);

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  return (
    <>
      <p className="hidden md:block lg:hidden font-semibold text-base leading-normal text-main-dark">
        Покупки
      </p>
      <Separator className="lg:hidden mt-4 mb-2.5 border-gray-light" />

      <table className="table-auto w-full border-collapse">
        <tbody>
          {bag.map((item: bagType) => (
            <React.Fragment key={item.id}>
              <tr key={'${item.id}-d'} className="hidden lg:table-row">
                <td className="font-normal text-sm text-main-dark leading-main-lh pb-5">
                  {format(item.date, 'dd.MM.yyyy')}
                </td>
                <td className="font-medium text-sm text-main-dark leading-main-lh pb-5">
                  № {item.number}
                </td>
                <td
                  className={cn(
                    'font-medium text-sm leading-main-lh pb-5',
                    item.state === 'Виконано'
                      ? 'text-green-additional-color'
                      : 'text-attention',
                  )}
                >
                  {item.state}
                </td>
                <td className="font-medium text-sm leading-main-lh pb-5 text-right w-7">
                  <TooltipShow
                    content={<p>Документи до замовлення</p>}
                    className="max-w-[160px] text-center"
                  >
                    <Link
                      href="#"
                      onClick={(e) => {
                        setId(item.id);
                        onClose(true, e);
                      }}
                      className="group"
                    >
                      <Icon
                        iconName="Doc"
                        width={16}
                        height={16}
                        className="fill-main-color group-hover:fill-main-dark transition-all"
                      />
                    </Link>
                  </TooltipShow>
                </td>
                <td className="font-semibold text-sm text-main-dark leading-main-lh text-right pb-5">
                  {Number(item.amount).toFixed(2)} грн
                </td>
              </tr>

              <tr key={`${item.id}-m`} className="lg:hidden">
                <td className="py-1.5">
                  <span className="font-medium text-sm text-main-dark leading-main-lh">
                    № {item.number}
                  </span>
                  <br />
                  <span
                    className={cn(
                      'font-medium text-sm leading-main-lh',
                      item.state === 'Виконано'
                        ? 'text-green-additional-color'
                        : 'text-attention',
                    )}
                  >
                    {item.state}
                  </span>
                </td>
                <td className="py-1.5 text-right">
                  <span className="font-normal text-sm text-main-dark leading-main-lh">
                    {format(item.date, 'dd.MM.yyyy')}
                  </span>
                  <br />
                  <span className="font-semibold text-sm text-main-dark leading-main-lh text-right w-min">
                    {Number(item.amount).toFixed(2)} грн
                  </span>
                </td>
                <td className="py-1.5 text-right w-10">
                  <TooltipShow
                    content={<p>Документи до замовлення</p>}
                    className="max-w-[160px] text-center"
                  >
                    <Link
                      href="#"
                      onClick={(e) => {
                        setId(item.id);
                        onClose(true, e);
                      }}
                      className="group"
                    >
                      <Icon
                        iconName="Doc"
                        width={24}
                        height={24}
                        className="fill-main-color group-hover:fill-main-dark transition-all w-6 h-6 ml-4 flex-shrink-0"
                      />
                    </Link>
                  </TooltipShow>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <Separator className="md:hidden mb-4 mt-2.5 border-gray-light lg:hidden" />
      <Link
        href="/bag"
        className="block text-center lg:text-right text-main-color hover:text-main-dark pt-3 lg:pt-0 font-semibold text-sm leading-main-lh"
      >
        Показати всі
      </Link>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ListOfDocs docId={id} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
