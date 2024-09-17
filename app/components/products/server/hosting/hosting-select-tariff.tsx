'use client';
import { Modal, ModalContent } from '@/app/components/common/modal-new';

import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { ServerChange } from '@/app/components/products/server/server-change';
import { HostingSelectBaseInfo } from '@/app/components/products/server/hosting/hosting-select-base-info';

export const orderTerm: any = [
  { key: 'a', value: '1 міс' },
  { key: 'b', value: '3 міс' },
  { key: 'c', value: '6 міс' },
  { key: 'd', value: '1 рік' },
];

interface HostingSelectTariffProps {
  data: ServerType;
  tariff: any;
  tariffs: any;
}
export const HostingSelectTariff = ({
  data,
  tariff,
  tariffs,
}: HostingSelectTariffProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const [selectedTerm, setSelectedTerm] = useState('a');

  return (
    <>
      <div className="flex flex-col p-4">
        <HostingSelectBaseInfo tariff={tariff} />
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          className="justify-between mb-6"
          defaultValue="a"
          value={selectedTerm}
          onValueChange={(value) => {
            if (value) setSelectedTerm(value);
          }}
        >
          {orderTerm.map((item: any) => (
            <ToggleGroupItem
              key={item.key}
              value={item.key}
              className="font-bold text-xs border-main-color text-main-color data-[state=on]:bg-main-color data-[state=on]:text-white"
              disabled={data.tariff === tariff.id}
            >
              {item.value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <KeyValText
          k={<span className="line-through">{tariff.price} грн/міс</span>}
          val={
            <span className="text-attention">
              економія - {tariff.price * 12 - tariff.promoPriceForYear} грн
            </span>
          }
          className="mb-1"
        />
        <KeyValText
          k={<span className="font-semibold">{tariff.promoPrice} грн/міс</span>}
          val={
            <span className="font-medium text-gray-dark">
              {tariff.promoPriceForYear} грн/рік
            </span>
          }
          className="mb-6"
        />
        <Button
          type="button"
          className="w-full"
          disabled={data.tariff === tariff.id}
          onClick={() => setOpen(true)}
        >
          {data.tariff === tariff.id ? 'Поточний тариф' : 'Замовити'}
        </Button>
      </div>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ServerChange
            data={data}
            tariff={tariff}
            tariffs={tariffs}
            orderTerm={orderTerm}
            selectedTerm={selectedTerm}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
