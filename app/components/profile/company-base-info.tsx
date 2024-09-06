import { Modal, ModalContent } from '@/app/components/common/modal';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ChangeUserPassword } from '@/app/components/profile/change-user-password';
import { useState } from 'react';

export const CompanyBaseInfo = () => {
  const [openPass, setOpenPass] = useState(false);
  const onClosePass = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpenPass(state);
  };
  const data = {
    id: 12232678,
    name: 'ТОВ Агропромбуд',
    email: 'mail_address@gmail.com',
    phone: '+38(097) 321-65-87',
    edrpou: '3508934009',
    contract: '8490475',
    avatar: 'avatar.png',
  };
  const dataKeyClass =
    'font-normal text-sm leading-main-lh text-gray-dark pr-2';
  const dataValClass = 'font-medium text-sm leading-main-lh text-main-dark';
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex gap-3 items-center mb-7">
          <div className="flex-shrink-0">
            <Icon width={24} height={24} iconName="Case" />
          </div>
          <div className="font-semibold text-base leading-normal text-main-dark">
            {data.name}
          </div>
        </div>
        <KeyValText className="mb-4" k="E-mail:" val={data.email} />
        <KeyValText className="mb-4" k="Телефон:" val={data.phone} />
        <KeyValText className="mb-4" k="ЄДРПОУ:" val={data.edrpou} />
        <KeyValText
          className="mb-8"
          k="Номер договору:"
          val={String(data.contract)}
          icon={
            <Button variant="ghost" className="w-6 h-6">
              <Icon
                width={24}
                height={24}
                iconName="Document"
                className="fill-main-color"
              />
            </Button>
          }
        />
      </div>
      <Button variant="default" className="mb-4">
        Редагувати дані
      </Button>
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setOpenPass(true)}
      >
        Змінити пароль
      </Button>
      <Button variant="destructive" className="font-semibold">
        Покинути компанію
      </Button>

      <Modal open={openPass} onOpenChange={() => onClosePass(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ChangeUserPassword onClose={() => onClosePass(false, undefined)} />
        </ModalContent>
      </Modal>
    </div>
  );
};
