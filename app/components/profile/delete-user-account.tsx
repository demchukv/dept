import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

interface DeleteUserAccountProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  amount: number;
}
export const DeleteUserAccount = ({
  onClose,
  amount,
}: DeleteUserAccountProps) => {
  const deleteAccount = () => {
    toast({
      title: 'Акаунт видалено',
      description: 'Ваш акаунт було видалено',
      variant: 'destructive',
    });
    onClose(false, undefined);
  };
  return (
    <>
      <ModalHeader className="mb-6">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Видалити акаунт
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div className="font-normal text-sm text-main-dark leading-main-lh space-y-4">
        <p>
          Ви впевнені, що хочете видалити акаунт? Цю дію не можна буде
          скасувати, всі послуги будуть припинені, а дані видалені через 30
          днів.
        </p>
        <p>
          Залишок на вашому балансі становить: {Number(amount).toFixed(2)} грн
        </p>
        <p>
          Для{' '}
          <Link href="#" className="font-semibold text-main-color">
            повернення коштів
          </Link>{' '}
          роздрукуйте та підпишіть заяву, після чого відправте її на{' '}
          <a
            href="mailto:billing@dept.ua"
            target="_blank"
            className="font-medium text-main-color"
          >
            billing@dept.ua
          </a>
        </p>
      </div>
      <ModalFooter className="flex-row justify-center gap-4 py-4">
        <Button type="button" onClick={() => onClose(false, undefined)}>
          Скасувати
        </Button>
        <Button
          className="bg-warning text-white"
          type="button"
          variant="destructive"
          onClick={() => {
            deleteAccount();
          }}
        >
          Видалити
        </Button>
      </ModalFooter>
    </>
  );
};
