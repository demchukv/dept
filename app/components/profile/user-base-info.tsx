import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { UploadAvatar } from '@/app/components/profile/upload-avatar';
import { Modal, ModalContent } from '@/app/components/common/modal';
import { useState } from 'react';
import { DeleteUserAccount } from '@/app/components/profile/delete-user-account';
import { ChangeUserPassword } from '@/app/components/profile/change-user-password';

export const UserBaseInfo = () => {
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const onClosePass = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpenPass(state);
  };
  const data = {
    id: 12345678,
    name: 'Шевченко Василь Петрович',
    email: 'mail_address@gmail.com',
    phone: '+38 (068) 765-43-21',
    avatar: 'avatar.png',
  };
  const amount = 250;
  const dataKeyClass =
    'font-normal text-sm leading-main-lh text-gray-dark pr-2';
  const dataValClass = 'font-medium text-sm leading-main-lh text-main-dark';
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex gap-3 items-center mb-7">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage
                src="{data.avatar}"
                alt="{data.name}"
                width={40}
                height={40}
              />
              <AvatarFallback className="bg-transparent">
                <Icon width={40} height={40} iconName="AvatarUser" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base leading-normal text-main-dark">
              {data.name}
            </span>
            <UploadAvatar sign="Додати фото профілю" />
          </div>
        </div>
        <KeyValText className="mb-4" k="E-mail:" val={data.email} />
        <KeyValText className="mb-4" k="Телефон:" val={data.phone} />
        <KeyValText
          className="mb-8"
          k="ID користувача:"
          val={String(data.id)}
        />
      </div>
      <Button type="button" variant="secondary" className="mb-4">
        Підтвердити дані через
        <Icon width={28} height={28} iconName="Diia" className="w-7 h-7 ml-2" />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="mb-4"
        onClick={() => setOpenPass(true)}
      >
        Змінити пароль
      </Button>
      <Button
        type="button"
        variant="destructive"
        className="font-semibold"
        onClick={() => setOpen(true)}
      >
        Видалити профіль
      </Button>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <DeleteUserAccount
            onClose={() => onClose(false, undefined)}
            amount={amount}
          />
        </ModalContent>
      </Modal>

      <Modal open={openPass} onOpenChange={() => onClosePass(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ChangeUserPassword onClose={() => onClosePass(false, undefined)} />
        </ModalContent>
      </Modal>
    </div>
  );
};
