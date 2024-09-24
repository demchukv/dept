'use client';

import React from 'react';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { i18nConfig, LOCALES } from '@/i18nConfig';

interface MenuItemProps {
  closeSidebar?: () => void;
}
export const SideMenu = ({ closeSidebar }: MenuItemProps) => {
  const path = usePathname();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || i18nConfig.defaultLocale;
  const router = useRouter();

  const subStates = {
    product:
      path === '/subscription' ||
      path === '/server' ||
      path === '/domain' ||
      path === '/certificate'
        ? true
        : false,
    call:
      path === '/my-numbers' ||
      path === '/scenario' ||
      path.includes('/scenario/') ||
      path === '/my-group' ||
      path === '/internal-lines'
        ? true
        : false,
    mail: false,
    setting: false,
    home: false,
    lang: false,
  };
  const [isOpen, setIsOpen] = React.useState(subStates);

  const handleLangChange = (e: React.MouseEvent, newLocale: string) => {
    e.preventDefault();
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;
    // redirect to the new locale path
    if (lang === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + path);
    } else {
      router.push(path.replace(`/${lang}`, `/${newLocale}`));
    }
    () => closeSidebar && closeSidebar();
    router.refresh();
  };

  const setAllIsOpenState = (variable: string, value: boolean) => {
    setIsOpen({ ...subStates, [variable]: value });
  };
  const linkClass =
    'flex w-full gap-2 items-center font-semibold text-sm leading-[1.14] text-main-dark hover:text-main-color text-wrap text-left';
  const subLinkClass =
    'text-sm font-medium text-main-dark leading-[1.14] hover:text-main-color';
  const subContentClass = 'flex flex-col pl-9 gap-5';

  return (
    <div className="flex flex-col gap-6 my-10 lg:my-6 px-6 pb-9 w-full h-full overflow-y-auto">
      <Link
        href="/"
        className={cn(linkClass, path === '/' && 'text-main-color')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Dashboard"
          className="flex-shrink-0"
        />
        {t('dashboard')}
      </Link>
      <Link
        href="/balance"
        className={cn(linkClass, path === '/balance' && 'text-main-color')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Balans"
          className="flex-shrink-0"
        />
        {t('balance')}
      </Link>
      <Link
        href="/profile"
        className={cn(linkClass, path === '/profile' && 'text-main-color')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="User"
          className="flex-shrink-0"
        />
        {t('profile')}
      </Link>
      <Link
        href="/shopping"
        className={cn(linkClass, path === '/shopping' && 'text-main-color')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon width={24} height={24} iconName="Bag" className="flex-shrink-0" />
        {t('shopping')}
      </Link>
      <Link
        href="/task"
        className={cn(
          linkClass,
          (path === '/task' || path === '/task/add-task') && 'text-main-color',
        )}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Task"
          className="flex-shrink-0"
        />
        {t('task')}
      </Link>
      <Link
        href="/repair"
        className={cn(
          linkClass,
          (path === '/repair' || path.includes('/repair/')) &&
            'text-main-color',
        )}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Repair"
          className="flex-shrink-0"
        />
        {t('repair')}
      </Link>

      <Collapsible
        open={isOpen.product}
        onOpenChange={() => setAllIsOpenState('product', !isOpen.product)}
        className="w-auto"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Product"
              className="flex-shrink-0"
            />
            {t('myproducts')}
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.product && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.product && 'pt-3')}
        >
          <Link
            href="/subscription"
            className={cn(
              subLinkClass,
              path === '/subscription' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Підписки
          </Link>
          <Link
            href="/server"
            className={cn(
              subLinkClass,
              path === '/server' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Сервери і хостинг
          </Link>
          <Link
            href="/domain"
            className={cn(
              subLinkClass,
              path === '/domain' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Домени
          </Link>
          <Link
            href="/certificate"
            className={cn(
              subLinkClass,
              path === '/certificate' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Сертифікати
          </Link>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isOpen.call}
        onOpenChange={() => setAllIsOpenState('call', !isOpen.call)}
        className="w-auto"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Call"
              className="flex-shrink-0"
            />
            {t('telephony')}
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.call && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.call && 'pt-3')}
        >
          <Link
            href="/my-numbers"
            className={cn(
              subLinkClass,
              path === '/my-numbers' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Мої номери
          </Link>
          <Link
            href="/scenario"
            className={cn(
              subLinkClass,
              (path === '/scenario' || path.includes('/scenario/')) &&
                'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Сценарії
          </Link>
          <Link
            href="/my-group"
            className={cn(
              subLinkClass,
              path === '/my-group' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Групи
          </Link>
          <Link
            href="/internal-lines"
            className={cn(
              subLinkClass,
              path === '/internal-lines' && 'text-main-color',
            )}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Внутрішні лінії
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Link
        href="/electronic"
        className={cn(linkClass, path === '/electronic' && 'text-main-color')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Electronics"
          className="flex-shrink-0"
        />
        {t('equipment')}
      </Link>

      <Collapsible
        open={isOpen.mail}
        onOpenChange={() => setAllIsOpenState('mail', !isOpen.mail)}
        className="w-auto"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Mail"
              className="flex-shrink-0"
            />
            {t('corporateMail')}
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.mail && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.mail && 'pt-3')}
        >
          <Link
            href="/my-numbers"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Акаунти
          </Link>
          <Link
            href="/scenario"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Домени
          </Link>
          <Link
            href="/my-group"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Групи
          </Link>
          <Link
            href="/internal-lines"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Внутрішні лінії
          </Link>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={isOpen.setting}
        onOpenChange={() => setAllIsOpenState('setting', !isOpen.setting)}
        className="w-auto"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Settings"
              className="flex-shrink-0"
            />
            {t('settings')}
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.setting && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.setting && 'pt-3')}
        >
          <Link
            href="/my-numbers"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Співробітники
          </Link>
          <Link
            href="/scenario"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Відділи
          </Link>
          <Link
            href="/my-group"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Інтеграції
          </Link>
          <Link
            href="/internal-lines"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            Ролі
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Separator className="my-5 lg:hidden" />

      <Collapsible
        open={isOpen.home}
        onOpenChange={() => setAllIsOpenState('home', !isOpen.home)}
        className="w-auto lg:hidden"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Home"
              className="flex-shrink-0"
            />
            {t('toSite')}
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.home && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.home && 'pt-3', 'lg:hidden')}
        >
          <Link
            href="https://dept.ua"
            target="_blank"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            {t('toUsers')}
          </Link>
          <Link
            href="https://dept.ua/business/"
            target="_blank"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            {t('business')}
          </Link>
          <Link
            href="https://dept.ua/shop/"
            target="_blank"
            className={subLinkClass}
            locale={lang}
            scroll={false}
            onClick={() => closeSidebar && closeSidebar()}
          >
            {t('shop')}
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Link
        href="/docs"
        className={cn(linkClass, 'lg:hidden')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Help"
          className="flex-shrink-0"
        />
        {t('instructions')}
      </Link>
      <Link
        href="/academy"
        className={cn(linkClass, 'lg:hidden')}
        locale={lang}
        scroll={false}
        onClick={() => closeSidebar && closeSidebar()}
      >
        <Icon
          width={24}
          height={24}
          iconName="Academy"
          className="flex-shrink-0"
        />
        {t('academy')}
      </Link>
      <Separator className="my-5 lg:hidden" />

      <Collapsible
        open={isOpen.lang}
        onOpenChange={() => setAllIsOpenState('lang', !isOpen.lang)}
        className="w-auto lg:hidden"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Globe"
              className="flex-shrink-0"
            />
            {t('language')}
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.lang && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.lang && 'pt-3')}
        >
          {Object.values(LOCALES).map((locale) => {
            return (
              <Link
                key={locale.code}
                locale={lang}
                href="#"
                className={subLinkClass}
                scroll={false}
                onClick={(e) => {
                  handleLangChange(e, locale.code);
                }}
              >
                {locale.upper}
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
