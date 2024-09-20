import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { certificateType } from '@/types/certificate';

interface certificateControlProps {
  data: certificateType;
}
export const CertificateControl = ({ data }: certificateControlProps) => {
  const openCertificateForm = () => {};
  return (
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
      <Button type="button" variant="destructive">
        Видалити сертифікат
        <Icon iconName="DeleteCircle" width={20} height={20} />
      </Button>
    </div>
  );
};
