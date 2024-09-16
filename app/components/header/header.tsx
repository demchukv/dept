'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import LogoBlue from '@/public/logo-blue.png';
import LogoGreen from '@/public/logo-green.png';
import { Sidebar } from '@/app/components/sidebar/sidebar';
import { Alert } from '@/app/components/header/alert';
import { Profile } from '@/app/components/header/profile';
import { LangSwitch } from '@/app/components/header/lang-switch';
import { TopMenu } from '@/app/components/header/top-menu';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentAccount } from '@/store/account/accountSlice';
import Link from 'next/link';
// import accountData from '@/data/account.json';

export const Header = () => {
  //TODO: get account type from backend or session
  const currentAccount = useAppSelector(selectCurrentAccount);

  const accoutType = currentAccount.account;

  const newAlert = true;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full bg-white py-3 md:border-b md:border-gray-light">
      <div className="f-full px-2 xs:px-4 lg:px-6 flex gap-1 xs:gap-2 sm:gap-10 md:gap-14 lg:gap-16 items-center justify-between">
        <div className="flex gap-3 items-center flex-shrink-0 ml-0 xs:ml-2 lg:ml-9 lg:mr-16">
          <Sidebar />
          <Image
            src={accoutType === 'company' ? LogoBlue : LogoGreen}
            priority
            alt="logo"
            width={60}
            height={34}
            className="w-[60px] h-[34px] md:w-[76px] md:h-[44px]"
          />
        </div>
        <div className="flex items-center flex-grow">
          <div className="flex flex-grow items-center justify-center sm:justify-end md:justify-start md:hidden">
            <Button type="button" size="sm" asChild>
              <Link href="/task/add-task">Нова заявка</Link>
            </Button>
          </div>
          <TopMenu />
        </div>
        <div className="flex gap-1 xs:gap-6 mr-0 xs:mr-2 items-center flex-shrink">
          <Profile />
          <LangSwitch />
          <Alert />
        </div>
      </div>
    </header>
  );
};
