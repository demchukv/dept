import { PhoneNumbers } from '@/types/call';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { NumbersControl } from '@/app/components/call/my-numbers/numbers-control';

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
  return (
    <>
      <Tabs defaultValue="numbers" className="w-full">
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
          {/* <CertificateCsr data={data} /> */}
          <p>Замовити новий номер</p>
        </TabsContent>
        <TabsContent value="sms">
          {/* <CertificateControl data={data} /> */}
          <p>SMS</p>
        </TabsContent>
        <TabsContent value="history">
          {/* <CertificateControl data={data} /> */}
          <p>Історія дзвінків і витрати</p>
        </TabsContent>
      </Tabs>
    </>
  );
};
