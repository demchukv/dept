'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';
import { Icon } from '@/components/utils/icon';
import { SideMenu } from '@/app/components/sidebar/side-menu';
import { useState } from 'react';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = 'flex gap-2';
  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger title="Open side menu" aria-haspopup="menu">
          <Icon
            width={24}
            height={24}
            iconName="Menu"
            className="fill-main-dark hover:fill-main-color cursor-pointer transition-all"
          />
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="p-0  flex gap-0 flex-col justify-between items-start bg-bg-color w-[300px] xs:w-[348px]"
        >
          <SheetHeader>
            <SheetTitle className="hidden">Side navigation menu</SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>

          <SideMenu closeSidebar={() => setIsOpen(false)} />

          <SheetFooter className="p-6 text-left sm:justify-start text-warning bg-bg-color">
            <SheetClose asChild>
              <Link href="/logout" className={linkClass}>
                <Icon
                  width={24}
                  height={24}
                  iconName="Logout"
                  className="fill-warning"
                />
                Вийти
              </Link>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
