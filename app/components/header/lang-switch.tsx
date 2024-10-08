'use client';
import { Icon } from '@/components/utils/icon';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import { i18nConfig, LOCALES } from '@/i18nConfig';

export const LangSwitch = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language || i18nConfig.defaultLocale;

  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  };

  return (
    <div className="hidden sm:block">
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden sm:block outline-none">
          <div className="group flex items-center">
            <span className="text-main-dark group-hover:text-main-color font-semibold leading-[1.14] cursor-pointer">
              {Object.values(LOCALES).map((locale) => {
                if (locale.code === currentLocale) {
                  return locale.upper;
                }
              })}
            </span>
            <Icon
              width={20}
              height={20}
              iconName="ArrowDown"
              className="fill-main-dark group-hover:fill-main-color cursor-pointer text-b"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-auto">
          <DropdownMenuGroup>
            {Object.values(LOCALES).map((locale) => {
              if (locale.code !== currentLocale) {
                return (
                  <DropdownMenuItem
                    className="group py-2.5 px-4 flex-col gap-1 justify-start items-start cursor-pointer"
                    key={locale.code}
                    onSelect={() => {
                      handleChange(locale.code);
                    }}
                  >
                    <div className="w-[50px] font-semibold text-sm text-main-dark transition-colors leading-main-lh truncate overflow-hidden">
                      {locale.upper}
                    </div>
                  </DropdownMenuItem>
                );
              }
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
