import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface LeaveCompanyProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  data: any;
}
export const LeaveCompany = ({ onClose, data }: LeaveCompanyProps) => {
  const leaveCompanyAccount = () => {
    toast({
      title: 'Покинути компанію',
      description: 'Ви успішно залишили компанію.',
      variant: 'destructive',
    });
    onClose(false, undefined);
  };
  return (
    <>
      <ModalHeader className="mb-6">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Покинути компанію
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div className="font-normal text-sm text-main-dark leading-main-lh space-y-4">
        <p>Ви впевнені, що хочете покинути компанію {data.name}?</p>
        <p>
          Це може вплинути на ваш доступ до корпоративних ресурсів та даних.
        </p>
      </div>
      <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4">
        <Button type="button" onClick={() => onClose(false, undefined)}>
          Скасувати
        </Button>
        <Button
          className="bg-warning text-white"
          type="button"
          variant="destructive"
          onClick={() => {
            leaveCompanyAccount();
          }}
        >
          Покинути компанію
        </Button>
      </ModalFooter>
    </>
  );
};
