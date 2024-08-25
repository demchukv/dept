import React from 'react';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const SideMenu = () => {
  const linkClass =
    'flex gap-2 items-center font-semibold text-sm lg:text-base leading-[1.14] text-main-dark hover:text-main-color';
  return (
    <div className="flex flex-col gap-6 my-10 lg:my-6 px-6 w-full h-full overflow-y-auto">
      <Link
        href="/"
        className="flex gap-2 items-center font-semibold text-sm lg:text-base leading-[1.14] text-main-dark hover:text-main-color"
      >
        <Icon width={24} height={24} iconName="Dashboard" />
        Дашбоард
      </Link>
      <Link href="/balans" className={linkClass}>
        <Icon width={24} height={24} iconName="Balans" />
        Баланс
      </Link>
      <Link href="/profile" className={linkClass}>
        <Icon width={24} height={24} iconName="User" />
        Мої дані
      </Link>
      <Link href="/bag" className={linkClass}>
        <Icon width={24} height={24} iconName="Bag" />
        Покупки
      </Link>
      <Link href="/task" className={linkClass}>
        <Icon width={24} height={24} iconName="Task" />
        Заявки / Задачі
      </Link>
      <Link href="/repair" className={linkClass}>
        <Icon width={24} height={24} iconName="Repair" />
        Ремонт техніки
      </Link>
      <Link href="/product" className={linkClass}>
        <Icon width={24} height={24} iconName="Product" />
        Мої продукти
      </Link>
      <Link href="/call" className={linkClass}>
        <Icon width={24} height={24} iconName="Call" />
        Телефонія
      </Link>
      <Link href="/electrinic" className={linkClass}>
        <Icon width={24} height={24} iconName="Electronics" />
        Техніка та девайси
      </Link>
      <Link href="/call" className={linkClass}>
        <Icon width={24} height={24} iconName="Mail" />
        Корпоративна пошта
      </Link>
      <Link href="/call" className={linkClass}>
        <Icon width={24} height={24} iconName="Settings" />
        Налаштування
      </Link>
      <Separator className="my-5" />
      <Link href="/" className={linkClass}>
        <Icon width={24} height={24} iconName="Home" />
        На сайт
      </Link>
      <Link href="/docs" className={linkClass}>
        <Icon width={24} height={24} iconName="Help" />
        Інструкції
      </Link>
      <Link href="/academy" className={linkClass}>
        <Icon width={24} height={24} iconName="Academy" />
        Dept академія
      </Link>
      <Separator className="my-5" />
      <Link href="#" className={linkClass}>
        <Icon width={24} height={24} iconName="Globe" />
        Мова
      </Link>
    </div>
  );
};
