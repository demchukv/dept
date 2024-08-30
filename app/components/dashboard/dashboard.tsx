import React from 'react';

import { cn } from '@/lib/utils';
//TODO: load data from API
import { getJson } from '@/data/get-json';

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
  const data = await getJson('/public/test-data/dashboard.json');

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
