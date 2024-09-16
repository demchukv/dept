'use client';
import { Modal, ModalContent } from '@/app/components/common/modal-new';

import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useState } from 'react';
import { ServerChange } from '@/app/components/products/server/server-change';
import { VirtualSelectBaseInfo } from '@/app/components/products/server/virtual/virtual-select-base-info';

interface VirtualSelectTariffProps {
  data: ServerType;
  tariff: any;
}
export const VirtualSelectTariff = ({
  data,
  tariff,
}: VirtualSelectTariffProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const [selectedTerm, setSelectedTerm] = useState('a');

  return (
    <>
      <div className="flex flex-col p-4">
        <VirtualSelectBaseInfo tariff={tariff} />

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
          <ToggleGroupItem
            value="a"
            className="font-bold text-xs border-main-color text-main-color data-[state=on]:bg-main-color data-[state=on]:text-white"
          >
            1 міс
          </ToggleGroupItem>
          <ToggleGroupItem
            value="b"
            className="font-bold text-xs border-main-color text-main-color data-[state=on]:bg-main-color data-[state=on]:text-white"
          >
            3 міс
          </ToggleGroupItem>
          <ToggleGroupItem
            value="c"
            className="font-bold text-xs border-main-color text-main-color data-[state=on]:bg-main-color data-[state=on]:text-white"
          >
            6 міс
          </ToggleGroupItem>
          <ToggleGroupItem
            value="d"
            className="font-bold text-xs border-main-color text-main-color data-[state=on]:bg-main-color data-[state=on]:text-white"
          >
            1 рік
          </ToggleGroupItem>
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
            selectedTerm={selectedTerm}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
