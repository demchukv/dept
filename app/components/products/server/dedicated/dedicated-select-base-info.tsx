import { KeyValText } from '@/app/components/common/key-val-text';
import { Icon } from '@/components/utils/icon';

interface DedicatedSelectBaseInfoProps {
  tariff: any;
}
export const DedicatedSelectBaseInfo = ({
  tariff,
}: DedicatedSelectBaseInfoProps) => {
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
      <KeyValText k="Об’єм пам’яті" val={tariff.memory} className="mb-1" />
      <KeyValText k="Процесор " val={tariff.processor} className="mb-3" />

      <ul className="mb-6">
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
      </ul>
    </>
  );
};
