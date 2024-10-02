import React, { useState } from 'react';
import { RoleSettingsDesktop } from '@/app/components/settings/role/role-settings-desktop';
import { RoleSettingsMobile } from '@/app/components/settings/role/role-settings-mobile';
import z from 'zod';

const accessList: any = [{ all: 'Всі' }, { own: 'Свої' }, { none: 'Закрито' }];
const accessListBoolean: boolean[] = [true, false];

//TODO: ge data fron API
const roleSettings = [
  {
    key: 'finance',
    name: 'Фінанси',
    sub: [
      {
        code: 'finance',
        name: '',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
    ],
  },
  {
    key: 'buy',
    name: 'Покупки',
    sub: [
      {
        code: 'buys',
        name: 'Корпоративні покупки',
        type: 'checkbox',
        values: { view: true, edit: false, create: false, delete: false },
      },
    ],
  },
  {
    key: 'tasks',
    name: 'Заявки / Задачі',
    sub: [
      {
        code: 'task',
        name: '',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'all', delete: 'none' },
      },
    ],
  },
  { key: 'products', name: 'Продукти', sub: [] },
  {
    key: 'call',
    name: 'Телефонія',
    sub: [
      {
        code: 'numbers',
        name: 'Номери',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
      {
        code: 'sms',
        name: 'SMS',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
      {
        code: 'history',
        name: 'Журнал викликів',
        type: 'select',
        values: { view: 'all', edit: 'none', create: 'none', delete: 'none' },
      },
    ],
  },
  {
    key: 'mail',
    name: 'Корпоративна пошта',
    sub: [
      {
        code: 'account',
        name: 'Акаунти',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
      {
        code: 'group',
        name: 'Групи',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
      {
        code: 'journal',
        name: 'Журнал подій',
        type: 'select',
        values: { view: 'all', edit: 'none', create: 'none', delete: 'none' },
      },
    ],
  },
  {
    key: 'settings',
    name: 'Загальні налаштування',
    super: true,
    sub: [
      {
        code: 'integration',
        name: 'Інтеграції',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
      {
        code: 'roles',
        name: 'Ролі',
        type: 'select',
        values: { view: 'all', edit: 'own', create: 'own', delete: 'own' },
      },
    ],
  },
];

const roleSettingsSchema = z.object({});

interface RoleSettingsProps {
  selectedRole: number;
}
export const RoleSettings = ({ selectedRole }: RoleSettingsProps) => {
  const [data, setData] = useState<any>(roleSettings);

  return (
    <>
      <div className="hidden sm:block">
        <RoleSettingsDesktop
          settingsData={data}
          roleSettingsSchema={roleSettingsSchema}
          accessList={accessList}
          accessListBoolean={accessListBoolean}
        />
      </div>
      <div className="block sm:hidden">
        <RoleSettingsMobile
          settingsData={data}
          roleSettingsSchema={roleSettingsSchema}
          accessList={accessList}
          accessListBoolean={accessListBoolean}
        />
      </div>
    </>
  );
};
