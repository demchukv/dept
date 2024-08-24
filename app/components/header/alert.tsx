import { Icon } from '@/components/utils/icon';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AlertList } from '@/app/components/header/alert-list';

export const Alert = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden sm:block outline-none">
        <div className="relative">
          <Icon
            width={24}
            height={24}
            iconName="Bell"
            className="fill-main-dark hover:fill-main-color cursor-pointer"
          />
          <span className="block absolute top-0 right-1 w-2 h-2 bg-main-color rounded-full"></span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[340px] h-[328px] rounded-[6px] py-2 pr-1 pl-0 shadow-[0_6px_40px_0_rgba(89, 125, 137, 0.2)] mr-1 border-none">
        <ScrollArea className="h-[312px] w-[334px] pr-2 border-none px-5">
          <AlertList />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
