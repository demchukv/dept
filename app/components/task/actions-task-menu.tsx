import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { taskType } from '@/types/account';
import { Icon } from '@/components/utils/icon';

export const ActionsTaskMenu = ({ task }: { task: any }) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (action: string) => {
    setModalType(action);
    setOpen(true);
  };

  const itemClass =
    'text-base text-main-dark font-normal leading-none px-5 py-2.5 cursor-pointer hover:bg-gray-light';
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-6 w-6 bg-transparent outline-none "
          >
            <span className="sr-only">Open menu</span>
            <Icon iconName="ActionMenu" width={24} height={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="py-2 px-0">
          <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => openModal('edit')}
            className={itemClass}
          >
            Скопіювати зовнішнє посилання
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal('accounts')}
            className={itemClass}
          >
            Копіювати завдання
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal('invitations')}
            className={itemClass}
          >
            Додати дочірнє завдання
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal('delete')}
            className={itemClass}
          >
            Запитати апдейт
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openModal('delete')}
            className={itemClass}
          >
            Позначити неактуальною
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} modal={true} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}

        {/* {modalType === 'edit' && <EditUserModal userId={user.id} />} */}
      </Dialog>
    </>
  );
};
