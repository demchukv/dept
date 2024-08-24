import React from 'react';

import accountData from '@/data/account.json';
import { Icon } from '@/components/utils/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Profile = () => {
  //TODO: get account type from backend
  const accoutType = accountData.account;

  return (
    <>
      <div className="group flex lg:gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="group flex lg:gap-2 items-center outline-none">
            <>
              {accoutType === 'company' ? (
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
                <span className="block text-main-dark text-sm leading-[1.14] font-semibold text-left group-hover:text-main-color">
                  {accountData.name}
                </span>
                <span className="block text-gray-dark text-[10px] leading-none font-normal text-left group-hover:text-main-color">
                  {accoutType === 'user'
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
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
