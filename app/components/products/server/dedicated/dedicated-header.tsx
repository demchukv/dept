'use client';
import { Icon } from '@/components/utils/icon';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { ServerType } from '@/types/server';
import { ServerChangeInfo } from '@/app/components/products/server/server-change-info';
import { useState } from 'react';

interface DedicatedHeaderProps {
  data: ServerType;
}
export const DedicatedHeader = ({ data }: DedicatedHeaderProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) {
      e.preventDefault();
    }
    setOpen(state);
  };
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
        {data?.dedicated?.name && (
          <div className="flex-grow text-left flex items-center gap-4">
            {data.waitOnChange && (
              <span
                className="text-main-color"
                onClick={(e) => {
                  setOpen(true);
                  e.stopPropagation();
                }}
              >
                <Icon iconName="ClockWait" width={24} height={24} />
              </span>
            )}
            {data.dedicated.name}
          </div>
        )}
        <div className="w-full sm:w-auto flex flex-end justify-between gap-6 font-normal">
          {data?.dedicated?.ip && (
            <div className="hidden sm:block">
              IP-адреса: {data.dedicated.ip}
            </div>
          )}
          {data?.price && <div>{data.price} грн/міс</div>}
          {data?.dedicated?.activeTo && <div>до {data.dedicated.activeTo}</div>}
        </div>
      </div>
      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ServerChangeInfo data={data} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
