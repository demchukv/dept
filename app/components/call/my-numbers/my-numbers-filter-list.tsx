'use client';
import { Button } from '@/components/ui/button';
import { PhoneNumbers } from '@/types/call';
import { Icon } from '@/components/utils/icon';
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const filterList = [
  { key: 'numberType', value: 'за типом номера' },
  { key: 'operator', value: 'за мобільним оператором' },
  { key: 'country', value: 'за країною' },
];
export const MyNumberFilterList = ({
  onSort,
  sortKey,
}: {
  onSort: (key: string) => void;
  sortKey: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden sm:flex items-center leading-main-lh">
        <span>Сортування:</span>
        <ul className="flex items-center">
          {filterList.map((item) => (
            <li
              key={item.key}
              className={cn(
                "font-semibold text-gray-dark pl-3 after:content-['|'] after:text-gray-light after:ml-3 last:after:hidden cursor-pointer",
                item.key === sortKey && 'text-main-color',
              )}
              onClick={() => onSort(item.key)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="text-main-color w-6 h-6 sm:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open menu</span>
        <Icon iconName="FilterIcon" width={24} height={24} />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader className="mb-6">
            <ModalTitle></ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner>
            <p className="font-semibold text-base">Сортувати:</p>
            <Separator className="my-4" />
            <ul>
              {filterList.map((item) => (
                <li
                  key={item.key}
                  className={cn(
                    'py-3 px-5 font-medium text-base cursor-pointer',
                    item.key === sortKey && 'text-main-color',
                  )}
                  onClick={() => {
                    onSort(item.key);
                    setOpen(false);
                  }}
                >
                  {item.value}
                </li>
              ))}
            </ul>
          </ModalInner>
          <ModalFooter>
            <div className="w-full flex flex-col sm:flex-row-reverse gap-3">
              <Button type="button" variant="default">
                Застосувати
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Відмінити
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
