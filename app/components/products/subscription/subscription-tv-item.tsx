'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { DisconnectDevice } from '@/app/components/products/subscription/disconnect-device';
import { TableCell, TableRow } from '@/components/ui/table';
import { deviceType, subscriptionType } from '@/types/subscription';
import { useState } from 'react';

interface SubscriptionTvItemProps {
  device: deviceType;
  data: subscriptionType;
}
export const SubscriptionTvItem = ({
  device,
  data,
}: SubscriptionTvItemProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  return (
    <TableRow key={device.id}>
      <TableCell className="font-normal text-sm leading-main-lh">
        {device.title}
      </TableCell>
      <TableCell>{device.lastActivity}</TableCell>
      <TableCell className="text-right">
        <Button
          type="button"
          variant="ghost"
          className="text-main-color hover:text-main-dark"
          onClick={() => setOpen(true)}
          title="Відв&#39;язати пристрій"
        >
          <Icon iconName="Close" width={20} height={20} className="sm:hidden" />
          <span className="hidden sm:inline">Відв&#39;язати пристрій</span>
        </Button>
        <Modal
          key={device.id}
          open={open}
          onOpenChange={() => onClose(false, undefined)}
        >
          <ModalContent className="grid grid-cols-1 gap-6">
            <DisconnectDevice data={data} device={device} onClose={onClose} />
          </ModalContent>
        </Modal>
      </TableCell>
    </TableRow>
  );
};
