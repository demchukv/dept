import { Icon } from '@/components/utils/icon';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const LangSwitch = () => {
  return (
    <div className="hidden sm:block">
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden sm:block outline-none">
          <div className="group flex items-center">
            <span className="text-main-dark group-hover:text-main-color font-semibold leading-[1.14] cursor-pointer">
              UA
            </span>
            <Icon
              width={20}
              height={20}
              iconName="ArrowDown"
              className="fill-main-dark group-hover:fill-main-color cursor-pointer"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuGroup>
            <DropdownMenuItem>EN</DropdownMenuItem>
            <DropdownMenuItem>ES</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
