'use client';
import { Info } from '@/app/components/common/info';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import { useState } from 'react';
import { HostingTransfer } from '@/app/components/products/server/hosting/hosting-transfer';

interface VirtualDedicatedTransferProps {
  data: ServerType;
}
export const VirtualDedicatedTransfer = ({
  data,
}: VirtualDedicatedTransferProps) => {
  const [open, setOpen] = useState(false);

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row mb-4">
        <Info>
          Для зміни власника послуги (трансферу) на електронну адресу поточного
          власника буде направлено листа з підтвердженням передачі. Після
          підтвердження дії послуга з&#39;явиться у списку серверів в особистому
          кабінеті нового власника.
        </Info>
        <Button
          type="button"
          variant="outline"
          className="py-2.5 w-full sm:w-auto self-end"
          onClick={() => setOpen(true)}
        >
          Передати
        </Button>
      </div>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-1 ">
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
              Передати послугу
            </ModalTitle>
          </ModalHeader>
          <ModalInner className="flex flex-col justify-start w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 flex-grow self-start">
            <HostingTransfer data={data} onCloseParent={onClose} />
          </ModalInner>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalContent>
      </Modal>
    </>
  );
};
