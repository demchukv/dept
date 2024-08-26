'use client';

import React from 'react';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const SideMenu = () => {
  const path = usePathname();

  const subStates = {
    product: false,
    call: false,
    mail: false,
    setting: false,
    home: false,
    lang: false,
  };
  const [isOpen, setIsOpen] = React.useState(subStates);

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
      >
        <Icon
          width={24}
          height={24}
          iconName="Dashboard"
          className="flex-shrink-0"
        />
        Дашбоард
      </Link>
      <Link
        href="/balance"
        className={cn(linkClass, path === '/balance' && 'text-main-color')}
      >
        <Icon
          width={24}
          height={24}
          iconName="Balans"
          className="flex-shrink-0"
        />
        Баланс
      </Link>
      <Link href="/profile" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="User"
          className="flex-shrink-0"
        />
        Мої дані
      </Link>
      <Link href="/bag" className={linkClass}>
        <Icon width={24} height={24} iconName="Bag" className="flex-shrink-0" />
        Покупки
      </Link>
      <Link href="/task" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="Task"
          className="flex-shrink-0"
        />
        Заявки / Задачі
      </Link>
      <Link href="/repair" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="Repair"
          className="flex-shrink-0"
        />
        Ремонт техніки
      </Link>
      {/* <Link href="/product" className={linkClass}>
        <Icon width={24} height={24} iconName="Product" />
        Мої продукти
      </Link> */}
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
            Мої продукти
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
          <Link href="/subscription" className={subLinkClass}>
            Підписки
          </Link>
          <Link href="/server" className={subLinkClass}>
            Сервери і хостинг
          </Link>
          <Link href="/domain" className={subLinkClass}>
            Доиени
          </Link>
          <Link href="/certificate" className={subLinkClass}>
            Сертифікати
          </Link>
        </CollapsibleContent>
      </Collapsible>
      {/* <Link href="/call" className={linkClass}>
        <Icon width={24} height={24} iconName="Call" />
        Телефонія
      </Link> */}
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
            Телефонія
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
          <Link href="/my-numbers" className={subLinkClass}>
            Мої номери
          </Link>
          <Link href="/scenario" className={subLinkClass}>
            Сценарії
          </Link>
          <Link href="/my-group" className={subLinkClass}>
            Групи
          </Link>
          <Link href="/internal-lines" className={subLinkClass}>
            Внутрішні лінії
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Link href="/electrinic" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="Electronics"
          className="flex-shrink-0"
        />
        Техніка та девайси
      </Link>
      {/* <Link href="/call" className={linkClass}>
        <Icon width={24} height={24} iconName="Mail" />
        Корпоративна пошта
      </Link> */}
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
            Корпоративна пошта
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
          <Link href="/my-numbers" className={subLinkClass}>
            Акаунти
          </Link>
          <Link href="/scenario" className={subLinkClass}>
            Домени
          </Link>
          <Link href="/my-group" className={subLinkClass}>
            Групи
          </Link>
          <Link href="/internal-lines" className={subLinkClass}>
            Внутрішні лінії
          </Link>
        </CollapsibleContent>
      </Collapsible>
      {/* <Link href="/call" className={linkClass}>
        <Icon width={24} height={24} iconName="Settings" />
        Налаштування
      </Link> */}
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
            Налаштування
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
          <Link href="/my-numbers" className={subLinkClass}>
            Співробітники
          </Link>
          <Link href="/scenario" className={subLinkClass}>
            Відділи
          </Link>
          <Link href="/my-group" className={subLinkClass}>
            Інтеграції
          </Link>
          <Link href="/internal-lines" className={subLinkClass}>
            Ролі
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Separator className="my-5" />
      {/* <Link href="/" className={linkClass}>
        <Icon width={24} height={24} iconName="Home" />
        На сайт
      </Link> */}
      <Collapsible
        open={isOpen.home}
        onOpenChange={() => setAllIsOpenState('home', !isOpen.home)}
        className="w-auto"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Home"
              className="flex-shrink-0"
            />
            На сайт
          </span>
          <Icon
            width={24}
            height={24}
            iconName="ArrowDown"
            className={cn(isOpen.home && 'rotate-180')}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className={cn(subContentClass, isOpen.home && 'pt-3')}
        >
          <Link href="/my-numbers" className={subLinkClass}>
            Користувачам
          </Link>
          <Link href="/scenario" className={subLinkClass}>
            Бізнесу
          </Link>
          <Link href="/my-group" className={subLinkClass}>
            Магазин
          </Link>
        </CollapsibleContent>
      </Collapsible>
      <Link href="/docs" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="Help"
          className="flex-shrink-0"
        />
        Інструкції
      </Link>
      <Link href="/academy" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="Academy"
          className="flex-shrink-0"
        />
        Dept академія
      </Link>
      <Separator className="my-5" />
      {/* <Link href="#" className={linkClass}>
        <Icon
          width={24}
          height={24}
          iconName="Globe"
          className="flex-shrink-0"
        />
        Мова
      </Link> */}
      <Collapsible
        open={isOpen.lang}
        onOpenChange={() => setAllIsOpenState('lang', !isOpen.lang)}
        className="w-auto"
      >
        <CollapsibleTrigger className={cn(linkClass, 'justify-between')}>
          <span className="flex items-center gap-2 justify-start">
            <Icon
              width={24}
              height={24}
              iconName="Globe"
              className="flex-shrink-0"
            />
            Мова
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
          <Link href="#" className={subLinkClass}>
            EN
          </Link>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
