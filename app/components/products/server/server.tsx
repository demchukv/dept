import { ServerType } from '@/types/server';
import { ServerInfo } from '@/app/components/products/server/server-info';

const data: ServerType[] = [
  {
    id: 1,
    type: 'virtual',
    state: 'active',
    title: 'Віртуальний сервер V-500 ',
    price: 1000,
    tariff: 1,
    waitOnChange: true,
    waitOnTariff: 3,
    virtual: {
      name: 'Віртуальний сервер V-500 ',
      provider: 'Virtuozzo',
      ip: '237.84.2.178',

      activeTo: '2024-12-31',
    },
  },
  {
    id: 2,
    type: 'hosting',
    state: 'active',
    title: 'Хостинг Н-250',
    price: 299,
    tariff: 1,
    hosting: {
      name: 'Хостинг Н-250',

      activeTo: '2024-12-31',
      sites: 2,
      maxSites: 10,
      disk: 120,
      maxDisk: 200,
      databases: 2,
      maxDatabases: 10,
    },
  },
  {
    id: 3,
    type: 'dedicated',
    state: 'active',
    title: 'Виділений сервер',
    price: 1000,
    tariff: 1,
    dedicated: {
      name: 'Виділений сервер',
      provider: 'Virtuozzo',
      ip: '237.84.2.178',

      activeTo: '2024-12-31',
    },
  },
  {
    id: 4,
    type: 'virtual',
    state: 'inactive',
    title: 'Віртуальний сервер V-500 ',
    price: 1000,
    tariff: 2,
    virtual: {
      name: 'Віртуальний сервер V-500 ',
      provider: 'Virtuozzo',
      ip: '237.84.2.178',

      activeTo: '2024-12-31',
    },
  },
  {
    id: 5,
    type: 'hosting',
    state: 'inactive',
    title: 'Хостинг Н-250',
    price: 350,
    tariff: 2,
    hosting: {
      name: 'Хостинг Н-250',

      activeTo: '2024-12-31',
      sites: 1,
      maxSites: 5,
      disk: 189,
      maxDisk: 500,
      databases: 1,
      maxDatabases: 10,
    },
  },
  {
    id: 6,
    type: 'dedicated',
    state: 'inactive',
    title: 'Виділений сервер',
    price: 1000,
    tariff: 2,
    dedicated: {
      name: 'Виділений сервер',
      provider: 'Virtuozzo',
      ip: '237.84.2.178',
      activeTo: '2024-12-31',
    },
  },
];
export const Server = () => {
  const activeSubs: ServerType[] = data.filter(
    (item) => item.state === 'active',
  );

  const inactiveSubs: ServerType[] = data.filter(
    (item) => item.state === 'inactive',
  );
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Мої продукти. Сервери і хостинг
      </h1>
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-4">
        Активні
      </h2>
      {activeSubs &&
        Array.isArray(activeSubs) &&
        activeSubs.map((item) => <ServerInfo key={item.id} data={item} />)}
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-4">
        Скасовані
      </h2>
      {inactiveSubs &&
        Array.isArray(inactiveSubs) &&
        inactiveSubs.map((item) => <ServerInfo key={item.id} data={item} />)}
    </>
  );
};
