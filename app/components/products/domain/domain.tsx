import { domainType } from '@/types/domain';
import { DomainInfo } from '@/app/components/products/domain/domain-info';

const data: domainType[] = [
  {
    id: 1,
    domain: 'mydomain.ua',
    price: 500,
    activated: '01.01.2023',
    activeTo: '01.01.2024',
    autoContinue: false,
    transferCode: '123456',
    transferRequested: false,
  },
];

export const Domain = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Мої продукти. Домени
      </h1>
      {data &&
        Array.isArray(data) &&
        data.map((item) => <DomainInfo key={item.id} data={item} />)}
    </>
  );
};
