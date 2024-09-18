import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { hostingTariff } from '@/app/components/products/server/server-change-tariff';
import { KeyValText } from '@/app/components/common/key-val-text';

interface HostingFtpProps {
  data: ServerType;
}
export const HostingFtp = ({ data }: HostingFtpProps) => {
  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);
  return (
    <>
      <div className="flex flex-row items-end justify-between gap-4">
        <div>
          <p className="font-semibold mb-2">FTP-користувачі</p>
          <p className="mb-2">
            Наразі тільки у вас є можливість підключення по FTP за вашим логіном
            особистого кабінету
          </p>
          <p className="mb-2">
            Для підключення використовуйте наступні налаштування, наприклад
            FileZilla:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <KeyValText k="host:" val="hosting.dept.com.ua" />
            <KeyValText k="port:" val="21" />
            <KeyValText k="login:" val="**ваш логін**" />
            <KeyValText k="password:" val="**ваш пароль**" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-dark mb-2">
            Доступно користувачів: 1/2
          </p>
          <Button type="button">
            Додати
            <Icon iconName="Plus" width={20} height={20} />
          </Button>
        </div>
      </div>
    </>
  );
};
