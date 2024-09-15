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
    maxDevices: 5,
    devices: [
      {
        id: 1,
        title: 'Samsung TV 55',
        lastActivity: '24.05.2024 19:47:08',
        instruction: 'https://example.com',
      },
      {
        id: 2,
        title: 'Iphone 15 Pro',
        lastActivity: '24.05.2024 23:12:49',
        instruction: 'https://example.com',
      },
      {
        id: 3,
        title: 'IPad Pro 12.9',
        lastActivity: '23.05.2024 14:08:22',
        instruction: 'https://example.com',
      },
    ],
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
    softs: [
      {
        id: 1,
        title: 'Avast Antivirus',
        softKey: 'LVFB-****-****-DFZZ',
        fileSource: 'https://example.com',
        instruction: 'https://example.com',
      },
    ],
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
