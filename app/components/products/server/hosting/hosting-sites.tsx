import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { hostingTariff } from '@/app/components/products/server/server-change-tariff';

interface HostingSitesProps {
  data: ServerType;
}
export const HostingSites = ({ data }: HostingSitesProps) => {
  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);
  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold mb-2">
            Сайти на тарифі “Хостинг Базовий”
          </p>
          <p>
            Наразі у вас немає підключених сайтів/доменів до послуги хостингу
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-dark mb-2">Доступно сайтів: 1/1</p>
          <Button type="button">
            Додати
            <Icon iconName="Plus" width={20} height={20} />
          </Button>
        </div>
      </div>
    </>
  );
};
