'use client';
import React from 'react';

import { accoutTypeT } from '@/types/account';
import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectAccounts,
  selectCurrentAccount,
  setCurrentAccount,
} from '@/store/account/accountSlice';

export const Profile = () => {
  const dispatch = useDispatch();
  const accounts = useSelector(selectAccounts);
  const currentAccount = useSelector(selectCurrentAccount);

  const changeAccount = async (account: accoutTypeT) => {
    await dispatch(setCurrentAccount(account));
  };
  const setAccount = async (account: accoutTypeT) => {
    await changeAccount(account);
    if (account.account === 'company') {
      document.documentElement.classList.remove('dark');
      await localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      await localStorage.setItem('theme', 'dark');
    }
  };

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && currentAccount === 'user')
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <>
      <div className="group flex lg:gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="group flex lg:gap-2 items-center outline-none"
            title="Profile menu"
          >
            <>
              {currentAccount?.account === 'company' ? (
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
                  {currentAccount?.name}
                </div>
                <span className="block text-gray-dark text-[10px] leading-none font-normal text-left group-hover:text-main-color">
                  {currentAccount?.account === 'user'
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
              {accounts?.map((item: accoutTypeT) => {
                return (
                  <DropdownMenuItem
                    key={item.id}
                    className="group py-2.5 px-4 flex-col gap-1 justify-start items-start cursor-pointer"
                    onSelect={() => {
                      setAccount(item as accoutTypeT);
                    }}
                  >
                    <div
                      className={cn(
                        'w-[228px] font-semibold text-sm text-main-dark transition-colors leading-main-lh truncate overflow-hidden',
                        item.account === 'company'
                          ? 'group-hover:text-main-blue'
                          : 'group-hover:text-main-green',
                      )}
                    >
                      {item.name}
                    </div>
                    <div
                      className={cn(
                        'font-normal text-[10px] text-gray-dark transition-colors leading-none',
                        item.account === 'company'
                          ? 'group-hover:text-main-blue'
                          : 'group-hover:text-main-green',
                      )}
                    >
                      {item.account === 'user'
                        ? 'Персональний акаунт'
                        : 'Акаунт компанії'}
                    </div>
                  </DropdownMenuItem>
                );
              })}

            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
