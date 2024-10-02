import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface UserSortModalProps {
  sort: string;
  setSort: (sort: string) => void;
  applySorting: (sort: string) => void;
}
export const UserSortModal = ({
  sort,
  setSort,
  applySorting,
}: UserSortModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="text-main-color hover:text-main-dark sm:hidden"
        onClick={() => setOpen(true)}
      >
        <Icon
          iconName="FilterIcon"
          width={24}
          height={24}
          className={cn('w-6 h-6')}
        />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[834px] md:max-w-[834px]">
          <ModalHeader className="mb-6">
            <ModalTitle></ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner>
            <p className="font-semibold text-base">Сортувати:</p>
            <Separator className="my-6" />
            <Button
              type="button"
              variant="ghost"
              className={cn(
                'text-base text-main-dark justify-start w-full font-medium py-3',
                sort === 'userName' && 'text-main-color',
              )}
              onClick={() => setSort('userName')}
            >
              За співробітником
            </Button>
            <Button
              type="button"
              variant="ghost"
              className={cn(
                'text-base text-main-dark justify-start w-full font-medium py-3',
                sort === 'roleName' && 'text-main-color',
              )}
              onClick={() => setSort('roleName')}
            >
              За роллю
            </Button>
          </ModalInner>
          <ModalFooter>
            <div className="w-full flex flex-col sm:flex-row-reverse gap-3">
              <Button
                type="submit"
                variant="default"
                onClick={() => {
                  applySorting(sort);
                  setOpen(false);
                }}
              >
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
