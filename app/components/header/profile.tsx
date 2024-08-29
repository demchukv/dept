'use client';
import React, { useEffect } from 'react';

import accountData from '@/data/account.json';
import { accoutTypeT } from '@/types/account';
import { Icon } from '@/components/utils/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Profile = () => {
  const [account, setAccount] = React.useState(accountData[0] as accoutTypeT);

  //TODO: get account type from backend

  const setTheme = (account: accoutTypeT) => {
    if (account.account === 'company') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    setTheme(account);
  }, [account]);

  return (
    <>
      <div className="group flex lg:gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="group flex lg:gap-2 items-center outline-none"
            title="Profile menu"
          >
            <>
              {account.account === 'company' ? (
                <Icon
                  width={24}
                  height={24}
                  iconName="Case"
                  className="fill-main-dark group-hover:fill-main-color cursor-pointer"
                />
              ) : (
                <Icon
                  width={24}
                  height={24}
                  iconName="User"
                  className="fill-main-dark group-hover:fill-main-color cursor-pointer"
                />
              )}

              <div className="hidden lg:flex lg:flex-col lg:items-start lg:justify-center gap-1 cursor-pointer">
                <div className="max-w-[270px] block text-main-dark text-sm leading-[1.14] font-semibold text-left group-hover:text-main-color truncate overflow-hidden">
                  {account.name}
                </div>
                <span className="block text-gray-dark text-[10px] leading-none font-normal text-left group-hover:text-main-color">
                  {account.account === 'user'
                    ? 'Персональний акаунт'
                    : 'Акаунт компанії'}
                </span>
              </div>
              <Icon
                width={20}
                height={20}
                iconName="ArrowDown"
                className="fill-main-dark group-hover:fill-main-color cursor-pointer"
              />
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[268px]">
            <DropdownMenuGroup>
              {accountData.map((item) => {
                return (
                  <DropdownMenuItem
                    key={item.id}
                    className="group py-2.5 px-4 flex-col gap-1 justify-start items-start cursor-pointer focus:bg-none bg-none"
                    onSelect={() => {
                      setAccount(item as accoutTypeT);
                    }}
                  >
                    <div className="w-[228px] font-semibold text-sm text-main-dark group-hover:text-main-color transition-colors leading-main-lh truncate overflow-hidden">
                      {item.name}
                    </div>
                    <div className="font-normal text-[10px] text-gray-dark group-hover:text-main-color transition-colors leading-none">
                      {item.account === 'user'
                        ? 'Персональний акаунт'
                        : 'Акаунт компанії'}
                    </div>
                  </DropdownMenuItem>
                );
              })}

              {/* <DropdownMenuItem className="group py-2.5 px-4 flex-col gap-1 justify-start items-start cursor-pointer focus:bg-none bg-none">
                <div className="w-[228px] font-semibold text-sm text-main-dark group-hover:text-main-color transition-colors leading-main-lh truncate overflow-hidden">
                  Шевченко Василь Петрович
                </div>
                <div className="font-normal text-[10px] text-gray-dark group-hover:text-main-color transition-colors leading-none">
                  Персональний акаунт
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group py-2.5 px-4 flex-col gap-1 justify-start items-start cursor-pointer focus:bg-none"
                onSelect={(item) => {
                  console.log(item);
                }}
              >
                <div className="w-[228px] font-semibold text-sm group-hover:text-main-color text-main-dark transition-colors leading-main-lh truncate overflow-hidden">
                  ТОВ Агропромбуд
                </div>
                <div className="font-normal text-[10px] text-gray-dark group-hover:text-main-color transition-colors leading-none">
                  Акаунт компанії
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="group py-2.5 px-4 flex-col gap-1 justify-start items-start cursor-pointer focus:bg-none">
                <div className="w-[228px] font-semibold text-sm text-main-dark group-hover:text-main-color transition-colors leading-main-lh truncate overflow-hidden">
                  ФОП Шевченко Василь Петрович
                </div>
                <div className="font-normal text-[10px] text-gray-dark group-hover:text-main-color transition-colors leading-none">
                  Акаунт компанії
                </div>
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
