import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { hostingTariff } from '@/app/components/products/server/server-change-tariff';
import { KeyValText } from '@/app/components/common/key-val-text';

interface HostingDatabasesProps {
  data: ServerType;
}
export const HostingDatabases = ({ data }: HostingDatabasesProps) => {
  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);
  return (
    <>
      <div className="flex flex-row items-end justify-between gap-4">
        <div>
          <p className="mb-2">
            Наразі у вас немає створених баз даних до послуги хостингу
          </p>
          <p className="mb-2">
            Для підключення використовуйте наступні налаштування:
          </p>
          <div className="flex gap-6">
            <p className="font-medium">
              https://hosting.dept.com.ua/phpmyadmin
            </p>
            <KeyValText
              k="login:"
              val={<span className="font-medium">**ваш логін**</span>}
            />
            <KeyValText
              k="password:"
              val={<span className="font-medium">**ваш пароль**</span>}
            />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-dark mb-2">Доступно БД: 2/2</p>
          <Button type="button">
            Додати
            <Icon iconName="Plus" width={20} height={20} />
          </Button>
        </div>
      </div>
    </>
  );
};
