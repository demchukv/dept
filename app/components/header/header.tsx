import { Button } from '@/components/ui/button';
import Image from 'next/image';

import LogoBlue from '@/public/logo-blue.png';
import LogoGreen from '@/public/logo-green.png';
import { Sidebar } from '@/app/components/sidebar/sidebar';
import { Alert } from '@/app/components/header/alert';
import { Profile } from '@/app/components/header/profile';
import { LangSwitch } from '@/app/components/header/lang-switch';
import { TopMenu } from '@/app/components/header/top-menu';

import accountData from '@/data/account.json';

export const Header = () => {
  //TODO: get account type from backend or session
  const accoutType = accountData.account;
  const newAlert = true;

  return (
    <header className="w-full bg-white py-3">
      <div className="f-full px-2 xs:px-4 lg:px-6 flex gap-1 xs:gap-2 sm:gap-10 md:gap-14 lg:gap-32 items-center justify-between">
        <div className="flex gap-3 items-center flex-shrink-0 ml-0 xs:ml-2 lg:ml-9">
          <Sidebar />
          {accoutType === 'company' && (
            <Image
              src={LogoBlue}
              alt="logo"
              width={60}
              height={34}
              className="w-[60px] h-[34px] md:w-[76px] md:h-[44px]"
            />
          )}
          {accoutType === 'user' && (
            <Image
              src={LogoGreen}
              alt="logo"
              width={60}
              height={34}
              className="w-[60px] h-[34px] md:w-[76px] md:h-[44px]"
            />
          )}
        </div>
        <div className="flex items-center flex-grow">
          <div className="flex flex-grow items-center justify-center sm:justify-end md:justify-start md:hidden">
            <Button type="button" size="sm">
              Нова заявка
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
