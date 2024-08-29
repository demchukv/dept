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

import initTranslations from '@/app/i18n';
import { cookies } from 'next/headers';

export const TopMenu = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'uk';
  const { t } = await initTranslations(locale, ['header']);

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
              {t('toSite')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="bg-white rounded-[6px] border border-gray-light py-2">
                <li className="py-[10px] px-5">
                  <Link
                    href="https://dept.ua/"
                    target="_blank"
                    className="text-main-dark font-normal text-base leading-none hover:text-main-color transition-colors"
                  >
                    {t('toUsers')}
                  </Link>
                </li>
                <li className="py-[10px] px-5">
                  <Link
                    href="https://dept.ua/business/"
                    target="_blank"
                    className="text-main-dark font-normal text-base leading-none hover:text-main-color transition-colors"
                  >
                    {t('business')}
                  </Link>
                </li>
                <li className="py-[10px] px-5">
                  <Link
                    href="https://dept.ua/shop/"
                    target="_blank"
                    className="text-main-dark font-normal text-base leading-none hover:text-main-color transition-colors"
                  >
                    {t('shop')}
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
                {t('instructions')}
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
                {t('academy')}
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
                {t('addTask')}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
