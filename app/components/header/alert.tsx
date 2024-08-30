import React from 'react';
import { AlertList } from '@/app/components/header/alert-list';
import { alertTypes } from '@/types/alert';
//TODO: load data from API
// import { getJson } from '@/data/get-json';

export const Alert = async () => {
  //TODO: replace with real data

  const alertData: alertTypes[] = JSON.parse(`[
    {
        "id": "1",
        "title": "Підписки. Avast Antivirus",
        "description": "Увага! Для подовження не достатньо коштів на балансі. Перейдіть у розділ Дані та баланс для поповнення",
        "read": false
    },
    {
        "id": "2",
        "title": "Підписки. Sweet TV",
        "description":"Вашу підписку скасовано. Щоб відновити перейдіть у розділ Підписки",
        "read": false
    },
    {
        "id": "3",
        "title": "Сервери і хостинг",
        "description":"Увага! Для подовження не достатньо коштів на балансі. Перейдіть у розділ Дані та баланс для поповнення",
        "read": true
    },
    {
        "id": "4",
        "title": "Сервери і хостинг",
        "description":"Увага! Для подовження не достатньо коштів на балансі. Перейдіть у розділ Дані та баланс для поповнення",
        "read": true
    },
    {
        "id": "5",
        "title": "Сервери і хостинг",
        "description":"Увага! Для подовження не достатньо коштів на балансі. Перейдіть у розділ Дані та баланс для поповнення",
        "read": true
    }
]`);

  return <AlertList alertData={alertData} />;
};
