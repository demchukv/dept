import React from 'react';
import { StatusLabel } from './status-label';

const data = [
  {
    id: 1,
    title: 'Зробити щось неабияке',
    number: '№ 4165',
    createdAt: '01.05.24',
    deadline: '10.05.24',
    status: 'Завершено',
    responsible: 'Розробник',
    sheduledTime: '01:00:00',
    spentTime: '00:16:32',
    cost: 'В пакеті підтримки',
    source: 'Бітрікс24',
    author: 'Сергій Сергієнко',
  },
  {
    id: 2,
    title: 'Вбити дракона',
    number: '№ 6545',
    createdAt: '01.05.24',
    deadline: '10.05.24',
    status: 'На паузі',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '8000',
    source: 'ASANA',
    author: 'Вася Пупкін',
  },
  {
    id: 3,
    title: 'Знайти аліньку квточку',
    number: '№ 8888',
    createdAt: '01.05.24',
    deadline: '03.05.24',
    status: 'В роботі',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '2000',
    source: 'Особистий кабінет',
    author: 'Ібрагім Ібрагімович',
  },
  {
    id: 4,
    title: 'Сходити в сусіднє село',
    number: '№ 8889',
    createdAt: '01.05.24',
    deadline: '03.05.24',
    status: 'В роботі',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '2000',
    source: 'Телеграм',
    author: 'Ібрагім Ібрагімович',
  },
];
export const Task = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Заявки / Задачі
      </h1>
      <p>sdjkfsdkjfd</p>
      <StatusLabel status="wait" className="mb-4" />
      <StatusLabel status="inwork" className="mb-4" />
      <StatusLabel status="pause" className="mb-4" />
      <StatusLabel status="ready" className="mb-4" />
    </>
  );
};
