import React from 'react';

import { cn } from '@/lib/utils';
//TODO: load data from API
// import { getJson } from '@/data/get-json';

// import { Balance } from '@/app/components/dashboard/balance';
// import { Call } from '@/app/components/dashboard/call';
// import { User } from '@/app/components/dashboard/user';
// import { TabsLeft } from '@/app/components/dashboard/tabs-left';
// import { TabsRight } from '@/app/components/dashboard/tabs-right';
// import { TabsAll } from '@/app/components/dashboard/tabs-all';
import dynamic from 'next/dynamic';

const Balance = dynamic(() =>
  import('@/app/components/dashboard/balance').then((mod) => mod.Balance),
);
const Call = dynamic(() =>
  import('@/app/components/dashboard/call').then((mod) => mod.Call),
);
const User = dynamic(() =>
  import('@/app/components/dashboard/user').then((mod) => mod.User),
);
const TabsLeft = dynamic(() =>
  import('@/app/components/dashboard/tabs-left').then((mod) => mod.TabsLeft),
);
const TabsRight = dynamic(() =>
  import('@/app/components/dashboard/tabs-right').then((mod) => mod.TabsRight),
);
const TabsAll = dynamic(() =>
  import('@/app/components/dashboard/tabs-all').then((mod) => mod.TabsAll),
);

export const Dashboard = async () => {
  //TODO: load data from API
  // const data = await getJson('/public/test-data/dashboard.json');
  const data = JSON.parse(`{
    "userInfo":{
        "contract": "8490475",
        "name": "ТОВ Агропромбуд",
        "email": "mail_address@gmail.com",
        "phone": "+38(097) 321-65-87",
        "edrpou": "3508934009"
    },
    "balance":{
        "balance": 1200.00,
        "writeOff": 2350.00,
        "nextDate": "01.04.2024"
    },
    "callInfo":{
        "startDate": "2024-04-24T00:00:00.000Z",
        "endDate": "2024-04-24T00:00:00.000Z",
        "incoming": "01:58:31",
        "outgoing": "03:24:44",
        "total": 144.54
    },
    "bag":[
        {
            "id": 1,
            "number":"45 715 811",
            "date": "2024-03-20T00:00:00.000Z",
            "state": "В обробці",
            "amount": 1100.00
        },
        {
            "id": 2,
            "number":"45 715 809",
            "date": "2024-03-25T00:00:00.000Z",
            "state": "В обробці",
            "amount": 1100.00
        },
                {
            "id": 3,
            "number":"45 715 796",
            "date": "2024-03-29T00:00:00.000Z",
            "state": "Виконано",
            "amount": 500.00
        },
                {
            "id": 4,
            "number":"45 715 784",
            "date": "2024-04-08T00:00:00.000Z",
            "state": "Виконано",
            "amount": 750.00
        },
                {
            "id": 5,
            "number":"45 715 755",
            "date": "2024-04-12T00:00:00.000Z",
            "state": "Виконано",
            "amount": 900.00
        },
                {
            "id": 6,
            "number":"45 715 712",
            "date": "2024-04-15T00:00:00.000Z",
            "state": "Виконано",
            "amount": 10500.00
        },
                {
            "id": 7,
            "number":"45 715 709",
            "date": "2024-04-29T00:00:00.000Z",
            "state": "Виконано",
            "amount": 1500.00
        }

    ],
    "task":[
        {
            "id":1,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Зробити щось неабияке",
            "state":"В роботі",
            "amount":8000.00
        },
        {
            "id":2,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Вбити дракона",
            "state":"В роботі",
            "amount":"В пакеті"
        },
        {
            "id":3,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Знайти аліньку квіточку",
            "state":"На паузі",
            "amount":4000.00
        },
        {
            "id":4,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Сходити в сусіднє село за кораблем і ще куда-небудь. І так кілька раз.",
            "state":"Завершено",
            "amount":2000.00
        }
    ],
    "repair":[
        {
            "id":1,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Xiaomi Redmi Note Pro 10",
            "state":"Відправлено",
            "amount":8000.00
        },
        {
            "id":2,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"MacBook Air 2022",
            "state":"Проводимо ремонт",
            "amount":"В пакеті"
        },
        {
            "id":3,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"IMac Pro 27’",
            "state":"Замовлені комплектуючі",
            "amount":8000.00
        },
        {
            "id":4,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Xiaomi Redmi Note Pro 10 + Xiaomi Redmi Note Pro 10",
            "state":"Завершено",
            "amount":8000.00
        },
        {
            "id":5,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Xiaomi Redmi Note Pro 10",
            "state":"Завершено",
            "amount":8000.00
        },
        {
            "id":6,
            "date":"2024-03-20T00:00:00.000Z",
            "title":"Xiaomi Redmi Note Pro 10",
            "state":"Завершено",
            "amount":8000.00
        }
    ],
    "subscription":[
        {
            "id":1,
            "type":"tv",
            "title":"Мегого Максимальна",
            "price":299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":2,
            "type":"tv",
            "title":"Мегого Максимальна",
            "price":299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":3,
            "type":"soft",
            "title":"Avast Antivirus",
            "price":299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":4,
            "type":"soft",
            "title":"Avast Antivirus",
            "price":299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":5,
            "type":"tv",
            "title":"Мегого Максимальна",
            "price":299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":6,
            "type":"tv",
            "title":"Sweet TV",
            "price":299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        }
    ],
    "numbers":[
        {
            "id":1,
            "type": "sip",
            "number":"+380963578891",
            "price": 120,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":2,
            "type": "sip",
            "number":"+380963578123",
            "price": 120,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":3,
            "type": "sim",
            "number":"+380963578333",
            "price": 120,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":4,
            "type": "sim",
            "number":"+380963578456",
            "price": 120,
            "activeTo":"2024-03-20T00:00:00.000Z"
        }
    ],
    "domain":[
        {
            "id":1,
            "domain": "mydomain.ukr",
            "price": 500,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":2,
            "domain": "mydomain2.ukr",
            "price": 500,
            "activeTo":"2024-03-20T00:00:00.000Z"
        }
    ],
    "certificate":[
        {
            "id":1,
            "cert": "Sectigo SSL (OV)",
            "price": 500,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":2,
            "cert": "Lets Encrypt SSL (OV)",
            "price": "Безкоштовно",
            "activeTo":"2024-03-20T00:00:00.000Z"
        }

    ],
    "server": [
        {
            "id":1,
            "brand": "HETZNER",
            "name":"Віртуальний сервер V-500 ",
            "price": 500,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":2,
            "brand": "",
            "name":"Виділений сервер",
            "price": 500,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":3,
            "brand": "",
            "name":"Хостинг Н-250",
            "price": 299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        },
        {
            "id":4,
            "brand": "",
            "name":"Хостинг Базовий",
            "price": 299,
            "activeTo":"2024-03-20T00:00:00.000Z"
        }
    ]
}`);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-start md:grid-cols-1 md:gap-5 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
        <Balance balance={data.balance} />
        <Call callInfo={data.callInfo} className={cn('')} />
        <User userInfo={data.userInfo} />
      </div>

      <div className="hidden md:grid md:gap-4 md:grid-cols-2 lg:gap-6 ">
        <TabsLeft data={data} />
        <TabsRight data={data} />
      </div>

      <div className="flex flex-col gap-4 md:hidden lg:hidden">
        <TabsAll data={data} />
      </div>
    </div>
  );
};
