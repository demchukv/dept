import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';

interface VirtualSelectTariffProps {
  data: ServerType;
  tariff: any;
}
export const VirtualSelectTariff = ({
  data,
  tariff,
}: VirtualSelectTariffProps) => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-2 mb-3">
        <Icon
          iconName="TariffOne"
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
      <KeyValText
        k={<span className="line-through">{tariff.price} грн/міс</span>}
        val={
          <span className="text-attention">
            економія - {tariff.price * 12 - tariff.promoPriceForYear} грн
          </span>
        }
        className="mb-1"
      />
      <KeyValText
        k={<span className="font-semibold">{tariff.promoPrice} грн/міс</span>}
        val={
          <span className="font-medium text-gray-dark">
            {tariff.promoPriceForYear} грн/рік
          </span>
        }
        className="mb-6"
      />
      <Button type="button" className="w-full">
        Замовити
      </Button>
    </div>
  );
};
