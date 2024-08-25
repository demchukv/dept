import React from 'react';
import { Card } from '@/app/components/card/card';

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 md:gap-5 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
        <Card>Баланс</Card>
        <Card>Телефонія</Card>
        <Card>Мої дані</Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <Card>Покупки</Card>
        <Card>Підписки</Card>
      </div>
    </div>
  );
};
