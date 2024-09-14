import { subscriptionType } from '@/types/subscription';
import { SubscriptionInfo } from '@/app/components/products/subscription/subscription-info';

const data: subscriptionType[] = [
  {
    id: 1,
    type: 'tv',
    title: 'Мегого Максимальна',
    price: 299,
    startFrom: '2023-06-01',
    activeTo: '2024-12-30',
    state: 'active',
  },
  {
    id: 2,
    type: 'tv',
    title: 'Мегого Максимальна',
    price: 299,
    startFrom: '2023-12-01',
    activeTo: '2025-01-01',
    state: 'active',
  },
  {
    id: 3,
    type: 'soft',
    title: 'Avast Antivirus',
    price: 50,
    startFrom: '2023-06-01',
    activeTo: '2025-05-01',
    state: 'active',
  },
  {
    id: 4,
    type: 'tv',
    title: 'Sweet TV',
    price: 50,
    startFrom: '2023-06-01',
    activeTo: '2024-01-01',
    state: 'inactive',
  },
];

export const Subscription = () => {
  const activeSubs: subscriptionType[] = data.filter(
    (item) => item.state === 'active',
  );

  const inactiveSubs: subscriptionType[] = data.filter(
    (item) => item.state === 'inactive',
  );

  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Мої продукти. Підписки
      </h1>
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-4">
        Активні
      </h2>
      {activeSubs &&
        Array.isArray(activeSubs) &&
        activeSubs.map((item) => (
          <SubscriptionInfo key={item.id} data={item} />
        ))}
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-4">
        Скасовані
      </h2>
      {inactiveSubs &&
        Array.isArray(inactiveSubs) &&
        inactiveSubs.map((item) => (
          <SubscriptionInfo key={item.id} data={item} />
        ))}
    </>
  );
};
