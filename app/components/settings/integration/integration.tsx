import React from 'react';
import { Card } from '@/app/components/card/card';
import { Info } from '../../common/info';
import { Separator } from '@/components/ui/separator';
import { IntegrateList } from '@/app/components/settings/integration/integrate-list';

const iData = {
  task: [
    {
      id: 1,
      name: 'Bitrix24',
      logo: 'bitrix24.png',
      state: 'active',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: 'dsfsdalkfsalkdfaslkdf8wyhjkdhfvajksl',
        href: 'http://bitrix.com/api',
      },
    },
    {
      id: 2,
      name: 'Trello',
      logo: 'trello.png',
      state: 'active',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: 'dsfsdalkfsalkdfaslkdf8wyhjkdhfvajksl',
        href: 'http://trello.com/api',
      },
    },
    {
      id: 3,
      name: 'Jira',
      logo: 'jira.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
    {
      id: 4,
      name: 'Asana',
      logo: 'asana.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
    {
      id: 5,
      name: 'OneBox',
      logo: 'onebox.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
    {
      id: 6,
      name: 'PeopleForce',
      logo: 'peopleforce.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
  ],
  datacentre: [
    {
      id: 1,
      name: 'Hetzner',
      logo: 'hetzner.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
    {
      id: 2,
      name: 'Ukraine',
      logo: 'ukraine.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://ukraine.com.ua/api',
      },
    },
    {
      id: 3,
      name: 'DigitalOcean',
      logo: 'digitalocean.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
  ],
  call: [
    {
      id: 1,
      name: 'Binotel',
      logo: 'binotel.png',
      state: 'active',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: 'sdyffy8sd9789sydfyh3298yr23feh',
        href: 'http://jira.com/api',
      },
    },
    {
      id: 3,
      name: 'Ringostat',
      logo: 'ringostat.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
    {
      id: 4,
      name: 'Zadarma',
      logo: 'zadarma.png',
      state: 'notset',
      instruction: 'https://youtu.be/QU7X5S1yQrY?si=XjWcC4xAeuZn9y2R',
      data: {
        apiKey: '',
        href: 'http://jira.com/api',
      },
    },
  ],
};
export const Integration = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Налаштування. Інтеграції
        </h1>
      </div>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 mb-9">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justifay-between gap-6">
          <div className="text-base font-semibold leading-normal">Заявки</div>
          <Info className="text-sm text-main-dark mt-0 sm:items-center">
            Підключити імпорт тікетів із вашої системи. Наприклад, якщо ви
            ведете роботу у своєму корпоративному середовищі і не хочете
            відволікатись на створення тікета.
          </Info>
        </div>
        <Separator className="my-8" />
        <IntegrateList data={iData.task} />
      </Card>

      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 mb-9">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justifay-between gap-6">
          <div className="text-base font-semibold leading-normal">
            Датацентри
          </div>
          <Info className="text-sm text-main-dark mt-0 sm:items-center">
            Підключити керування послугами, які замовлені в сторонніх
            провайдерів.
          </Info>
        </div>
        <Separator className="my-8" />
        <IntegrateList data={iData.datacentre} />
      </Card>

      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justifay-between gap-6">
          <div className="text-base font-semibold leading-normal">
            Телефонія
          </div>
          <Info className="text-sm text-main-dark mt-0 sm:items-center">
            Підключити телефонну систему для вашого бізнесу, щоб приймати та
            здійснювати дзвінки через інтернет.
          </Info>
        </div>
        <Separator className="my-8" />
        <IntegrateList data={iData.call} />
      </Card>
    </>
  );
};
