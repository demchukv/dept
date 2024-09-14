'use client';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardHeader } from '@/app/components/card/card';
import { repairType } from '@/types/repair';
import { Separator } from '@/components/ui/separator';
import { KeyValText } from '../common/key-val-text';
import {
  RepairStatusLabel,
  RepairStatusLabelText,
} from './repair-status-label';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RepairInfoPhoto } from './repair-info-photo';
import { RepairInfoComplect } from './repair-info-complect';
import { RepairInfoParts } from './repair-info-parts';
import { RepairInfoWork } from './repair-info-work';
import { useState } from 'react';
import { ReplenishBalance } from '@/app/components/balance/replenish-balance';

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
    serial: 'ARG0151051989460456',
    inTTN: '45 45645 45646 4564',
    costParts: '1500',
    costWork: '500',
    progress: 50,
    progressTitle: 'Задовільний',
    complect: ['Macbook Air 2017', 'Apple Magic Mouse 2', 'Зарядний пристрій'],
    defect:
      'Сколи, подряпини, вм’ятини на корпусі, можуть бути описані будь які дефекти, що ідентифікують пристрій',
    workList: [
      {
        id: 1,
        title: 'Діагностика несправності',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 2,
        title: 'Заміна модуля',
        price: '1000',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 3,
        title: 'Чистка від пилу',
        price: '200',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 4,
        title: 'Збірка',
        price: '200',
        quantity: 1,
        date: '10.05.2024',
      },
    ],
    partsList: [
      {
        id: 1,
        title: 'Модуль Wi-Fi для MacBook A1466',
        price: '1000',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/72/89/1349935.jpeg',
      },
      {
        id: 2,
        title: 'Комплект гвитнів кришки',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/fa/08/1349936.jpeg',
      },
      {
        id: 5,
        title: 'Комплект гвитнів кришки',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 3,
        title: 'Модуль Wi-Fi для MacBook A1466',
        price: '1000',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/72/89/1349935.jpeg',
      },
      {
        id: 4,
        title: 'Комплект гвитнів кришки',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/fa/08/1349936.jpeg',
      },
    ],
    photoList: [
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f4/7c/3586030.jpeg',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/8d/ad/3586032.jpeg',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/c8/d8/3586031.jpeg',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/b2/b7/1279725.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
    ],
  },
  {
    id: 2,
    number: 'REP-867278',
    device: 'MacBook Ait 2022',
    createdAt: '01.05.2024',
    deadline: '10.10.2024',
    status: 'ready',
    action: 'Заміна модулю Wi-Fi',
    client: 'Галина Бухгалтерович',
    cost: '8000',
    payment: 'Сплачено',
    serial: 'ARG0151051989460456',
    inTTN: '45 45645 45646 4564',
    outTTN: '45 45645 45646 4564',
    costParts: '1500',
    costWork: '500',
    progress: 30,
    progressTitle: 'Не задовільний',

    complect: ['Macbook Air 2017', 'Apple Magic Mouse 2', 'Зарядний пристрій'],
    defect:
      'Сколи, подряпини, вм’ятини на корпусі, можуть бути описані будь які дефекти, що ідентифікують пристрій',
    workList: [
      {
        id: 1,
        title: 'Діагностика несправності',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 2,
        title: 'Заміна модуля',
        price: '1000',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 3,
        title: 'Чистка від пилу',
        price: '200',
        quantity: 1,
        date: '10.05.2024',
      },
      {
        id: 4,
        title: 'Збірка',
        price: '200',
        quantity: 1,
        date: '10.05.2024',
      },
    ],
    partsList: [
      {
        id: 1,
        title: 'Модуль Wi-Fi для MacBook A1466',
        price: '1000',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/72/89/1349935.jpeg',
      },
      {
        id: 2,
        title: 'Комплект гвитнів кришки',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/fa/08/1349936.jpeg',
      },
      {
        id: 3,
        title: 'Модуль Wi-Fi для MacBook A1466',
        price: '1000',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/72/89/1349935.jpeg',
      },
      {
        id: 4,
        title: 'Комплект гвитнів кришки',
        price: '500',
        quantity: 1,
        date: '10.05.2024',
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/fa/08/1349936.jpeg',
      },
    ],
    photoList: [
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f4/7c/3586030.jpeg',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/8d/ad/3586032.jpeg',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/c8/d8/3586031.jpeg',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/b2/b7/1279725.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
    ],
  },
];

export const RepairInfo = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const data: repairType | undefined = dataRepair.find(
    (item) => item.id === Number(id),
  );

  const paymentText: React.ReactNode =
    data?.payment === 'Сплачено' ? (
      <>
        <span className="text-green-additional-color font-semibold text-base">
          Сплачено
        </span>
      </>
    ) : (
      <span className="text-orange-additional-color font-semibold text-base">
        Не оплачено
      </span>
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
            <CardHeader className="hidden sm:flex">
              <div>{data.number}</div>
              <div className="font-normal">від {data.createdAt}</div>
              <div>{data.device}</div>
              <div>{data.action}</div>
              <div className="font-normal">{data.client}</div>
            </CardHeader>
            <CardHeader className="sm:hidden flex-col items-start gap-1">
              <div>{data.device}</div>
              <RepairStatusLabelText status={data.status} />
              <KeyValText
                k={data.action}
                val={
                  String(data.cost) + (Number.isNaN(data.cost) ? '' : ' грн')
                }
                className="w-full justify-between"
              />
            </CardHeader>

            <Separator className="mt-4 sm:mt-5 mb-4 sm:mb-8" />

            <div className="flex flex-col sm:flex-row-reverse sm:justify-between sm:gap-8">
              <div className="sm:flex sm:flex-col sm:justify-between sm:min-w-[300px]">
                <div className="flex flex-col gap-3 mb-4">
                  {data.serial && (
                    <KeyValText
                      k="Серійний номер:"
                      val={data.serial}
                      className="hidden sm:flex"
                    />
                  )}
                  <KeyValText
                    k="Дата заявки:"
                    val={data.createdAt}
                    className="justify-between sm:hidden"
                  />
                  <KeyValText
                    k="Номер заявки:"
                    val={data.number}
                    className="justify-between sm:hidden"
                  />
                  <KeyValText
                    k="Співробітник /замовник:"
                    val={data.client}
                    className="justify-between sm:hidden"
                  />
                  {data.inTTN && (
                    <KeyValText
                      k="ТТН відправки:"
                      val={data.inTTN}
                      className="justify-between sm:justify-start"
                    />
                  )}
                  <RepairStatusLabel status={data.status} />
                  <KeyValText
                    k="Статус оплати:"
                    val={paymentText}
                    icon={
                      <Link href="#" download className="hover:text-main-color">
                        <Icon
                          iconName="Doc"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </Link>
                    }
                    className="justify-between"
                  />
                  {data.inTTN && (
                    <KeyValText
                      k="Вартість запчастин:"
                      val={
                        String(data.costParts) +
                        (Number.isNaN(data.costParts) ? '' : ' грн')
                      }
                      className="justify-between"
                    />
                  )}
                  {data.inTTN && (
                    <KeyValText
                      k="Вартість роботи:"
                      val={
                        String(data.costWork) +
                        (Number.isNaN(data.costWork) ? '' : ' грн')
                      }
                      className="justify-between"
                    />
                  )}
                  <KeyValText
                    k="Разом:"
                    val={
                      String(data.cost) +
                      (Number.isNaN(data.cost) ? '' : ' грн')
                    }
                    className="justify-between"
                  />
                  {data.status === 'ready' && data.outTTN && (
                    <KeyValText
                      k="Зворотня ТТН:"
                      val={data.outTTN}
                      className="justify-between"
                    />
                  )}
                </div>
                <Button
                  type="button"
                  className="w-full sm:w-auto"
                  onClick={() => setOpen(true)}
                >
                  Оплатити
                </Button>
                <ReplenishBalance open={open} onClose={onClose} />
              </div>

              <div className="max-w-full flex flex-col">
                <Separator className="my-4 sm:hidden" />

                <Accordion
                  type="single"
                  collapsible
                  className="w-full flex flex-col gap-4 border-none "
                  defaultValue="item-1"
                >
                  <AccordionItem value="item-1" className="w-full">
                    <AccordionTrigger className="sm:hidden">
                      Інформація про пристрій
                    </AccordionTrigger>
                    <AccordionContent className="max-w-full sm:flex sm:gap-8 sm:justify-between relative">
                      <div className="w-full sm:w-[calc(50%-20px)] pb-4 sm:pb-0">
                        <RepairInfoPhoto data={data} />
                      </div>
                      <div className="w-full sm:w-[calc(50%-20px)] pb-4 sm:pb-0">
                        <RepairInfoComplect data={data} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator className="my-4 sm:my-6" />

                <Accordion
                  type="single"
                  collapsible
                  className="w-full flex flex-col gap-4 border-none"
                  defaultValue="item-2"
                >
                  <AccordionItem value="item-2" className="w-full">
                    <AccordionTrigger className="sm:hidden">
                      Деталі по ремонту
                    </AccordionTrigger>
                    <AccordionContent className="sm:flex sm:gap-8 sm:justify-between">
                      <div className="w-full sm:w-[calc(50%-20px)] pb-4 sm:pb-0">
                        <RepairInfoParts data={data} />
                      </div>
                      <div className="w-full sm:w-[calc(50%-20px)] pb-4 sm:pb-0">
                        <RepairInfoWork data={data} />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Separator className="my-4 sm:hidden" />
              </div>
            </div>
          </Card>
        </>
      )}
    </>
  );
};
