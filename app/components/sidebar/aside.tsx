import React from 'react';
import { SideMenu } from '@/app/components/sidebar/side-menu';
import Link from 'next/link';
import { Icon } from '@/components/utils/icon';

export const Aside = () => {
  return (
    <aside className="w-[234px] bg-white hidden lg:block">
      <SideMenu />
      <div className="fixed bottom-0 left-0 w-[234px] p-6 bg-white shadow-[0_-6px_20px_0_rgba(89, 125, 137, 0.08)]">
        <Link
          href="/logout"
          className="hidden lg:flex gap-2 items-center font-semibold text-sm lg:text-base leading-[1.14] text-main-dark hover:text-main-color"
        >
          <Icon width={24} height={24} iconName="Logout" />
          Вийти
        </Link>
      </div>
    </aside>
  );
};
