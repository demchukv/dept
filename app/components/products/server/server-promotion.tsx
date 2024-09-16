'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { useState } from 'react';
import { ServerTransfer } from '@/app/components/products/server/server-transfer';
import { ServerType } from '@/types/server';

interface ServerPromotionProps {
  data: ServerType;
}
export const ServerPromotion = ({ data }: ServerPromotionProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <Icon
            iconName="DangerTriangle"
            width={20}
            height={20}
            className="fill-attention flex-shrink-0 w-5 h-5"
          />
          <p className="text-xs leading-[1.33]">
            Компанія dept надає на 10% більше кожного ресурсу від ваших поточних
            потужностей у провайдера Hetzner. Пропонуємо вам на 10% дешевшу
            вартість, з фіксацією її протягом одного року.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className="w-full sm:w-auto"
        >
          Перенести до dept
        </Button>
      </div>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ServerTransfer data={data} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
