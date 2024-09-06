import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';

interface ChangeUserPasswordProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const ChangeUserPassword = ({ onClose }: ChangeUserPasswordProps) => {
  return (
    <>
      <ModalHeader className="mb-6">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Змінити пароль
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div>Form</div>
      <ModalFooter className="flex-row justify-center gap-4 py-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => onClose(false, undefined)}
        >
          Скасувати
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={() => {
            onClose(false, undefined);
          }}
        >
          Зберегти
        </Button>
      </ModalFooter>
    </>
  );
};
