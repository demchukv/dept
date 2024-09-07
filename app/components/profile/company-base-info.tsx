import { Modal, ModalContent } from '@/app/components/common/modal';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ChangeUserPassword } from '@/app/components/profile/change-user-password';
import { LeaveCompany } from '@/app/components/profile/leave-company';
import { useState } from 'react';
import { ListCompanyDocs } from '@/app/components/profile/list-company-docs';

interface CompanyBaseInfoProps {
  companyData: any;
  addrData: any;
  view: 'data' | 'edit';
  setView: (view: 'data' | 'edit') => void;
}
export const CompanyBaseInfo = ({
  companyData,
  addrData,
  view,
  setView,
}: CompanyBaseInfoProps) => {
  const [open, setOpen] = useState(false);
  const [openPass, setOpenPass] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const onClosePass = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpenPass(state);
  };
  const onCloseDocs = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpenDocs(state);
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
            {companyData.name}
          </div>
        </div>
        <KeyValText className="mb-4" k="E-mail:" val={companyData.email} />
        <KeyValText className="mb-4" k="Телефон:" val={companyData.phone} />
        <KeyValText className="mb-4" k="ЄДРПОУ:" val={companyData.edrpou} />
        <KeyValText
          className="mb-8"
          k="Номер договору:"
          val={String(companyData.contract)}
          icon={
            <Button
              variant="ghost"
              className="w-6 h-6"
              onClick={() => setOpenDocs(true)}
            >
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
      <Button
        variant="default"
        className="mb-4"
        onClick={() => setView('edit')}
      >
        Редагувати дані
      </Button>
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setOpenPass(true)}
      >
        Змінити пароль
      </Button>
      <Button
        variant="destructive"
        className="font-semibold"
        onClick={() => setOpen(true)}
      >
        Покинути компанію
      </Button>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <LeaveCompany
            onClose={() => onClose(false, undefined)}
            data={companyData}
          />
        </ModalContent>
      </Modal>

      <Modal open={openPass} onOpenChange={() => onClosePass(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ChangeUserPassword onClose={() => onClosePass(false, undefined)} />
        </ModalContent>
      </Modal>

      <Modal open={openDocs} onOpenChange={() => onCloseDocs(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ListCompanyDocs
            onClose={() => onCloseDocs(false, undefined)}
            companyData={companyData}
          />
        </ModalContent>
      </Modal>
    </div>
  );
};
