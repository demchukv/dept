import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Icon } from '@/components/utils/icon';
import React from 'react';

export const TopMenu = () => {
  return (
    <div className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-7">
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Icon
                width={24}
                height={24}
                iconName="Home"
                className="fill-main-color"
              />{' '}
              На сайт
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="bg-white rounded-[6px] border border-gray-light py-2">
                <li className="py-[10px] px-5">
                  <Link
                    href="№"
                    className="text-main-dark font-normal text-base leading-none hover:text-main-color transition-colors"
                  >
                    Користувачам
                  </Link>
                </li>
                <li className="py-[10px] px-5">
                  <Link
                    href="№"
                    className="text-main-dark font-normal text-base leading-none hover:text-main-color transition-colors"
                  >
                    Бізнесу
                  </Link>
                </li>
                <li className="py-[10px] px-5">
                  <Link
                    href="№"
                    className="text-main-dark font-normal text-base leading-none hover:text-main-color transition-colors"
                  >
                    Магазин
                  </Link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className="flex items-center gap-2 font-semibold text-sm text-black hover:text-main-color transition-colors">
                <Icon
                  width={24}
                  height={24}
                  iconName="Help"
                  className="fill-main-color"
                />
                Інструкції
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/academy" legacyBehavior passHref>
              <NavigationMenuLink className="flex items-center gap-2 font-semibold text-sm text-black hover:text-main-color transition-colors">
                <Icon
                  width={24}
                  height={24}
                  iconName="Academy"
                  className="fill-main-color"
                />
                Dept академія
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="#" className="group" legacyBehavior passHref>
              <NavigationMenuLink className=" flex items-center gap-[2px] font-semibold text-sm text-main-color transition-colors">
                <Icon
                  width={20}
                  height={20}
                  iconName="Plus"
                  className="fill-main-color w-5 h-5 transition-all"
                />
                Додати заявку/задачу
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
