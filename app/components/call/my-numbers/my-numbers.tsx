'use client';
import { PhoneNumbers } from '@/types/call';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { NumbersControl } from '@/app/components/call/my-numbers/numbers-control';
import { OrderNumber } from '@/app/components/call/my-numbers/order-number';
import { Sms } from '@/app/components/call/my-numbers/sms';
import { History } from '@/app/components/call/my-numbers/history';
import { useEffect, useState } from 'react';

const data: PhoneNumbers[] = [
  {
    id: 1,
    number: '380963578891',
    numberType: 'sip',
    operator: 'Kyivstar',
    operatorIcon: 'KyivStar',
    country: 'Україна',
    priceForMonth: 120,
    priceForMinute: 0.02,
    activeTo: '2024-12-31',
  },
  {
    id: 2,
    number: '380987654321',
    numberType: 'sip',
    operator: 'Kyivstar',
    operatorIcon: 'KyivStar',
    country: 'Україна',
    priceForMonth: 120,
    priceForMinute: 0.02,
    activeTo: '2024-12-31',
    inTransfer: true,
  },
  {
    id: 3,
    number: '380963578891',
    numberType: 'sim',
    operator: 'Kyivstar',
    operatorIcon: 'KyivStar',
    country: 'Україна',
    priceForMonth: 120,
    priceForMinute: 0.02,
    activeTo: '2024-12-31',
  },
  {
    id: 4,
    number: '380963578891',
    numberType: 'sim',
    operator: 'Kyivstar',
    operatorIcon: 'KyivStar',
    country: 'Україна',
    priceForMonth: 120,
    priceForMinute: 0.02,
    activeTo: '2024-12-31',
  },
  {
    id: 5,
    number: '380963578891',
    numberType: 'sim',
    operator: 'Kyivstar',
    operatorIcon: 'KyivStar',
    country: 'Україна',
    priceForMonth: 120,
    priceForMinute: 0.02,
    activeTo: '2024-12-31',
  },
];
export const MyNumbers = () => {
  const [activeTab, setActiveTab] = useState('numbers');

  useEffect(() => {
    if (window.location.hash === '#ordernew') {
      setActiveTab('ordernew');
    } else {
      return;
    }
  }, [window.location.hash]);

  return (
    <>
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={(value) => {
          window.location.hash = value;
          setActiveTab(value);
        }}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
            Телефонія. Мої номери
          </h1>
          <TabsList className=" border-t border-gray-light">
            <TabsTrigger value="numbers">Номери</TabsTrigger>
            <TabsTrigger value="ordernew">Замовити новий номер</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="history">
              Історія дзвінків і витрати
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="numbers">
          <NumbersControl data={data} />
        </TabsContent>
        <TabsContent value="ordernew">
          <OrderNumber />
        </TabsContent>
        <TabsContent value="sms">
          <Sms />
        </TabsContent>
        <TabsContent value="history">
          <History />
        </TabsContent>
      </Tabs>
    </>
  );
};
