import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { AddTaskForm } from '@/app/components/task/add-task-form';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { Card } from '@/app/components/card/card';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Створити заявку / задачу',
  description: 'Dept - Створення нової заявки або задачі',
};
const AddTaskPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="flex gap-3 items-center mb-6 sm:mb-4">
        <Link href="/task" className="hover:text-main-color">
          {/* <Icon iconName="ArrowBack" width={24} height={24} /> */}
        </Link>
        <h1 className="font-bold text-2xl leading-none text-main-dark ">
          Мої заявки / задачі
        </h1>
      </div>
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-3 sm:mb-4">
        Нова заявка
      </h2>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)]">
        <AddTaskForm />
      </Card>
    </TranslationsProvider>
  );
};

export default AddTaskPage;
