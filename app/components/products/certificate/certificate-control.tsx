import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { certificateType } from '@/types/certificate';
import { CertificateControlForm } from '@/app/components/products/certificate/certificate-control-form';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { useState } from 'react';
import { CertificateCancel } from '@/app/components/products/certificate/certificate-cancel';

interface certificateControlProps {
  data: certificateType;
}
export const CertificateControl = ({ data }: certificateControlProps) => {
  const [view, setView] = useState('menu');
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const openCertificateForm = () => {
    setView('form');
  };

  return (
    <>
      {view === 'form' && (
        <CertificateControlForm data={data} closeForm={() => setView('menu')} />
      )}
      {view === 'menu' && (
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            className="text-main-color font-semibold gap-2"
            onClick={() => openCertificateForm()}
          >
            Перевипустити
            <Icon iconName="Refresh" width={20} height={20} />
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Видалити сертифікат
            <Icon iconName="DeleteCircle" width={20} height={20} />
          </Button>
        </div>
      )}

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <CertificateCancel data={data} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
