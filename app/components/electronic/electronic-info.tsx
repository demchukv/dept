'use client';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import React from 'react';
import { Card, CardHeader } from '@/app/components/card/card';
import { electronicType } from '@/types/electronic';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { dataElectronic } from '@/app/components/electronic/electronic';
import { useParams } from 'next/navigation';
import { Credentials } from '@/app/components/electronic/credentials';

export const ElectronicInfo = () => {
  const { id } = useParams();
  const data = dataElectronic.find(
    (item) => item.id === Number(id),
  ) as electronicType;

  return (
    <>
      <div className="flex gap-3 items-center mb-6 sm:mb-9">
        <Link href="/electronic" className="hover:text-main-color">
          <Icon iconName="ArrowBack" width={24} height={24} />
        </Link>
        <h1 className="font-bold text-2xl leading-none text-main-dark ">
          Техніка у використанні
        </h1>
      </div>
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-3">
        Перегляд пристрою
      </h2>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)]">
        <CardHeader className="flex items-center pb-6 gap-4 md:gap-9 border-b border-gray-light">
          <div className="flex sm:items-center flex-col sm:flex-row justify-between w-full">
            <div>{data.title}</div>
            <div className="font-normal text-sm sm:font-semibold sm:text-base">
              {data.user}
            </div>
          </div>
          <div className="flex flex-col-reverse items-end sm:items-center sm:flex-row justify-between w-full">
            <div className="text-main-color font-medium text-sm sm:font-semibold sm:text-base">
              {data.department}
            </div>
            <div className="font-normal text-sm sm:text-base">
              {data.cost} грн/міс
            </div>
          </div>
          <div className="hidden sm:block font-normal whitespace-nowrap">
            до {data.toDate}
          </div>
        </CardHeader>
        <Tabs defaultValue="credentials" className="w-full">
          <TabsList>
            <TabsTrigger value="credentials">Облікові дані</TabsTrigger>
            <TabsTrigger value="billing">Біллінг</TabsTrigger>
            <TabsTrigger value="user">Користувач</TabsTrigger>
            <TabsTrigger value="upgrade">Заміна/апгрейд</TabsTrigger>
            <TabsTrigger value="history">Історія</TabsTrigger>
          </TabsList>
          <TabsContent value="credentials">
            <Credentials data={data} />
          </TabsContent>
          <TabsContent value="billing">Біллінг</TabsContent>
          <TabsContent value="user">Користувач</TabsContent>
          <TabsContent value="upgrade">Заміна/апгрейд</TabsContent>
          <TabsContent value="history">Історія</TabsContent>
        </Tabs>
      </Card>
    </>
  );
};
