'use client';
import { Icon } from '@/components/utils/icon';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { ServerType } from '@/types/server';
import { ServerChangeInfo } from '@/app/components/products/server/server-change-info';
import { useState } from 'react';

interface HostingHeaderProps {
  data: ServerType;
}
export const HostingHeader = ({ data }: HostingHeaderProps) => {
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
        {data?.hosting?.name && (
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

            {data.hosting.name}
          </div>
        )}
        <div className="hidden sm:flex flex-end gap-6 font-normal text-gray-medium">
          {data?.hosting?.sites && data?.hosting?.maxSites && (
            <div>
              Сайтів: {data.hosting.sites}/{data.hosting.maxSites}
            </div>
          )}
          {data?.hosting?.disk && data?.hosting?.maxDisk && (
            <div>
              Диск: {data.hosting.disk}/{data.hosting.maxDisk}
            </div>
          )}
          {data?.hosting?.databases && data?.hosting?.maxDatabases && (
            <div>
              БД: {data.hosting.databases}/{data.hosting.maxDatabases}
            </div>
          )}
        </div>
        <div className="w-full sm:w-auto flex flex-row-reverse sm:flex-row justify-between flex-end gap-6 font-normal">
          {data?.price && <div>{data.price} грн/міс</div>}
          {data?.hosting?.activeTo && <div>до {data.hosting.activeTo}</div>}
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
