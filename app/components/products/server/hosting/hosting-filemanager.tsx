import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { hostingTariff } from '@/app/components/products/server/server-change-tariff';

interface HostingFilemanagerProps {
  data: ServerType;
}
export const HostingFilemanager = ({ data }: HostingFilemanagerProps) => {
  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);
  return (
    <>
      <div className="flex flex-row items-end justify-between gap-4">
        <div>
          <p className="mb-2">Компонент на пів року роботи :)</p>
        </div>
      </div>
    </>
  );
};
