import React from 'react';
import { AlertList } from '@/app/components/header/alert-list';
import { alertTypes } from '@/types/alert';
//TODO: load data from API
import { getJson } from '@/data/get-json';

export const Alert = async () => {
  //TODO: replace with real data
  const alertData: alertTypes[] = await getJson(
    '/public/test-data/alerts.json',
  );

  return <AlertList alertData={alertData} />;
};
