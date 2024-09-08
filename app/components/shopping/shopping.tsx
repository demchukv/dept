import { FilterForm } from '@/app/components/shopping/filter-form';
import { OrderList } from '@/app/components/shopping/order-list';

const orders = [
  {
    id: 1,
    number: '45 715 821',
    products: [
      {
        id: 1,
        name: 'SSD-накопичувач Samsung Portable SSD T7 500GB USB 3.2 Type-C (MU-PC500R/WW) Red',
        price: 500,
        count: 1,
      },
    ],
    payStatus: 'Сплачено',
    services: 0,
    delivery: 0,
    total: 500,
    client: {
      id: 1,
      name: 'Зайцев Олександр Сергійович',
    },
    status: [
      { id: 1, date: '10.03.2024', name: 'Обробляється' },
      {
        id: 2,
        date: '11.03.2024',
        name: 'Відправлено',
      },
      {
        id: 3,
        date: null,
        name: 'Очікує отримувача',
      },
      {
        id: 4,
        date: null,
        name: 'Виконано',
      },
    ],
    address: 'Ямпіль, вул. Миру 157',
    fio: 'Шевченко Олег Олегович',
  },
  {
    id: 2,
    number: '45 715 811',
    products: [
      {
        id: 1,
        name: 'SSD-накопичувач Samsung Portable SSD T7 500GB USB 3.2 Type-C (MU-PC500R/WW) Red',
        price: 500,
        count: 1,
      },
      {
        id: 2,
        name: 'Телевізор',
        price: 5000,
        count: 1,
      },
    ],
    payStatus: 'Сплачено',
    services: 0,
    delivery: 0,
    total: 5500,
    client: {
      id: 1,
      name: 'Зайцев Олександр Сергійович',
    },
    status: [
      { id: 1, date: '10.03.2024', name: 'Обробляється' },
      {
        id: 2,
        date: '11.03.2024',
        name: 'Відправлено',
      },
      {
        id: 3,
        date: '14.03.2024',
        name: 'Очікує отримувача',
      },
      {
        id: 4,
        date: '20.03.2024',
        name: 'Виконано',
      },
    ],
    address: 'Ямпіль, вул. Миру 157',
    fio: 'Шевченко Олег Олегович',
  },
];

export const Shopping = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Покупки
      </h1>
      <FilterForm />
      <OrderList orders={orders} />
    </>
  );
};
