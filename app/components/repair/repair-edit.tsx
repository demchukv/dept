'use client';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader } from '@/app/components/card/card';
import { repairType } from '@/types/repair';
import { Separator } from '@/components/ui/separator';

const dataRepair: repairType[] = [
  {
    id: 1,
    number: 'REP-590146',
    device: 'Xiaomi Redmi Note Pro 10',
    createdAt: '10.05.2024',
    deadline: '10.10.2024',
    status: 'inwork',
    action: 'Заміна екрану',
    client: 'Остап Остапченко',
    cost: 'В пакеті підтримки',
    payment: 'В тарифі',
  },
  {
    id: 2,
    number: 'REP-867278',
    device: 'MacBook Ait 2022',
    createdAt: '01.05.2024',
    deadline: '10.10.2024',
    status: 'send',
    action: 'Заміна модулю Wi-Fi',
    client: 'Галина Бухгалтерович',
    cost: '8000',
    payment: 'Сплачено',
  },
];
export const RepairEdit = () => {
  const { id } = useParams();
  const data: repairType | undefined = dataRepair.find(
    (item) => item.id === Number(id),
  );
  return (
    <>
      {data && (
        <>
          <div className="flex gap-3 items-center mb-6 sm:mb-4">
            <Link href="/repair" className="hover:text-main-color">
              <Icon iconName="ArrowBack" width={24} height={24} />
            </Link>
            <h1 className="font-bold text-2xl leading-none text-main-dark ">
              Ремонт техніки. {data.number}
            </h1>
          </div>
          <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)]">
            <CardHeader>
              <div>{data.number}</div>
              <div className="font-normal">від {data.createdAt}</div>
              <div>{data.device}</div>
              <div>{data.action}</div>
              <div className="font-normal">{data.client}</div>
            </CardHeader>
            <Separator className="mt-5 mb-8" />
          </Card>
        </>
      )}
    </>
  );
};
