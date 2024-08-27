import React from 'react';
import { Balance } from '@/app/components/dashboard/balance';
import { cn } from '@/lib/utils';
//TODO: load data from API
import { getJson } from '@/data/get-json';
import { Call } from '@/app/components/dashboard/call';
import { User } from '@/app/components/dashboard/user';
import { TabsLeft } from '@/app/components/dashboard/tabs-left';
import { TabsRight } from '@/app/components/dashboard/tabs-right';
import { TabsAll } from '@/app/components/dashboard/tabs-all';

export const Dashboard = async () => {
  //TODO: load data from API
  const data = await getJson('/data/dashboard.json');

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

      <div className="flex flex-col gap-4 md:hidden">
        {/* <TabsAll data={data} /> */}
      </div>
    </div>
  );
};
