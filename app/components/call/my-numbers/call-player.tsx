'use client';
import { Button } from '@/components/ui/button';
import { callType, PhoneNumbers } from '@/types/call';
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

export const CallPlayer = ({ msg }: { msg: callType }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="text-main-color w-6 h-6"
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Open player</span>
        <Icon iconName="Sound" width={24} height={24} />
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
