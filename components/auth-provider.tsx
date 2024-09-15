'use client';
// import { SessionProvider } from 'next-auth/react';
// import { auth } from '@/auth';
import { Context } from '@/components/context';
import { accoutTypeT } from '@/types/account';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userAccount: accoutTypeT = {
    id: 1,
    account: 'company',
    name: 'ТОВ Агропромбуд',
    balance: 500,
  };

  //   const session = await auth();
  return <Context.Provider value={userAccount}>{children}</Context.Provider>;
};
