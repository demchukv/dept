import { KeyValText } from '@/app/components/common/key-val-text';
import { Icon } from '@/components/utils/icon';

interface HostingSelectBaseInfoProps {
  tariff: any;
}
export const HostingSelectBaseInfo = ({
  tariff,
}: HostingSelectBaseInfoProps) => {
  return (
    <>
      <div className="flex gap-2 mb-3">
        <Icon
          iconName={tariff.icon}
          width={24}
          height={24}
          className="fill-main-color"
        />
        <span className="font-semibold">{tariff.title}</span>
      </div>
      <KeyValText k="Об’єм SSD" val={tariff.disk} className="mb-1" />
      <KeyValText k="Кількість сайтів" val={tariff.sites} className="mb-1" />
      <KeyValText
        k="Кількість баз даних "
        val={tariff.databases}
        className="mb-3"
      />
      <KeyValText k="FTP-акаунтів " val={tariff.ftp} className="mb-3" />

      {/* <ul className="mb-6">
        {tariff.additional.map((item: string, index: number) => (
          <li key={index} className="flex gap-2">
            <Icon
              iconName="CheckDouble"
              width={24}
              height={24}
              className="fill-main-color"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul> */}
    </>
  );
};
