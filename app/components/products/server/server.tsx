import { ServerType } from '@/types/server';
import { ServerInfo } from '@/app/components/products/server/server-info';

const data: ServerType[] = [
  { id: 1, state: 'active', title: 'Віртуальний сервер V-500 ' },
  { id: 2, state: 'inactive', title: 'Хостинг Н-250' },
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
