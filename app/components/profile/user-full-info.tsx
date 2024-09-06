import { CardHeader } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { KeyValText } from '@/app/components/common/key-val-text';

export const UserFullInfo = () => {
  const data = {
    billing: [
      {
        id: 1,
        addr: 'Ukraine, reg. Kyivska, district Kyiv, 03061, Halana Yaroslava str, 10 - 57',
      },
    ],
    delivery: [
      {
        id: 1,
        addr: 'Ukraine, reg. Kyivska, district Kyiv, 03061, Halana Yaroslava str, 10 - 57',
      },
      {
        id: 2,
        addr: 'Ukraine, reg. Rivnenska, district Rivne, 28075, Shevchenko str. 112 - 92',
      },
    ],
    recipients: [
      {
        id: 1,
        name: 'Олещенко Олег Олексійович',
      },
      {
        id: 2,
        name: 'Коломієць Наталя Дмитрівна',
      },
    ],
  };
  return (
    <>
      <CardHeader className="border-b border-gray-light pb-4 mb-4">
        Інформація про користувача
        <Button type="button">Редагувати дані</Button>
      </CardHeader>

      <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
        Білінг адреси:
      </p>
      <div className="mb-6 space-y-2">
        {data.billing.map((item, i) => (
          <KeyValText key={item.id} k={`Адреса ${i + 1}: `} val={item.addr} />
        ))}
      </div>

      <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
        Адреси доставки:
      </p>
      <div className="mb-6 space-y-2">
        {data.delivery.map((item, i) => (
          <KeyValText key={item.id} k={`Адреса ${i + 1}: `} val={item.addr} />
        ))}
      </div>

      <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
        Отримувачі замовлення:
      </p>
      <div className="space-y-2">
        {data.recipients.map((item, i) => (
          <KeyValText
            key={item.id}
            k={`Отримувач ${i + 1}: `}
            val={item.name}
          />
        ))}
      </div>
    </>
  );
};
