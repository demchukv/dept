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

export const SideMenu = () => {
  const path = usePathname();
  const { t, i18n } = useTranslation();
  const lang = i18n.language || i18nConfig.defaultLocale;
  const router = useRouter();

  const subStates = {
    product: false,
    call: false,
    mail: false,
    setting: false,
    home: false,
    lang: false,
  };
  const [isOpen, setIsOpen] = React.useState(subStates);

  const handleLangChange = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`;
    console.log(lang, 'to', newLocale);
    // redirect to the new locale path
    console.log('start redirect');
    console.log('defaultLocale', i18nConfig.defaultLocale);
    console.log('prefixDefault', i18nConfig.prefixDefault);
    if (lang === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      console.log('/' + newLocale + path);
      router.push('/' + newLocale + path);
    } else {
      console.log(`/${lang}`, `/${newLocale}`);
      router.push(path.replace(`/${lang}`, `/${newLocale}`));
    }
    console.log('start router refresh');
    router.refresh();
    console.log('end router refresh');
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
        className={cn(linkClass, path === '/bag' && 'text-main-color')}
        locale={lang}
        scroll={false}
      >
        <Icon width={24} height={24} iconName="Bag" className="flex-shrink-0" />
        {t('shopping')}
      </Link>
      <Link
        href="/task"
        className={cn(linkClass, path === '/task' && 'text-main-color')}
        locale={lang}
        scroll={false}
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
        className={cn(linkClass, path === '/repair' && 'text-main-color')}
        locale={lang}
        scroll={false}
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
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Підписки
          </Link>
          <Link
            href="/server"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Сервери і хостинг
          </Link>
          <Link
            href="/domain"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Домени
          </Link>
          <Link
            href="/certificate"
            className={subLinkClass}
            locale={lang}
            scroll={false}
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
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Мої номери
          </Link>
          <Link
            href="/scenario"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Сценарії
          </Link>
          <Link
            href="/my-group"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Групи
          </Link>
          <Link
            href="/internal-lines"
            className={subLinkClass}
            locale={lang}
            scroll={false}
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
          >
            Акаунти
          </Link>
          <Link
            href="/scenario"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Домени
          </Link>
          <Link
            href="/my-group"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Групи
          </Link>
          <Link
            href="/internal-lines"
            className={subLinkClass}
            locale={lang}
            scroll={false}
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
          >
            Співробітники
          </Link>
          <Link
            href="/scenario"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Відділи
          </Link>
          <Link
            href="/my-group"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            Інтеграції
          </Link>
          <Link
            href="/internal-lines"
            className={subLinkClass}
            locale={lang}
            scroll={false}
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
          >
            {t('toUsers')}
          </Link>
          <Link
            href="https://dept.ua/business/"
            target="_blank"
            className={subLinkClass}
            locale={lang}
            scroll={false}
          >
            {t('business')}
          </Link>
          <Link
            href="https://dept.ua/shop/"
            target="_blank"
            className={subLinkClass}
            locale={lang}
            scroll={false}
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
                onClick={() => {
                  handleLangChange(locale.code);
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
