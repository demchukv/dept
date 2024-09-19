import { HostingSitesOptions } from '@/app/components/products/server/hosting/hosting-sites-options';
import { Modal, ModalContent } from '@/app/components/common/modal-new';

interface HostingSitesOptionModalProps {
  data: any;
  open: boolean;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const HostingSitesOptionModal = ({
  data,
  open,
  onClose,
}: HostingSitesOptionModalProps) => {
  return (
    <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
      <ModalContent className="block">
        <HostingSitesOptions data={data} />
      </ModalContent>
    </Modal>
  );
};
