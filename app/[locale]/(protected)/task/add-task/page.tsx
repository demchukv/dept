import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { AddTaskForm } from '@/app/components/task/add-task-form';

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
      <AddTaskForm />
    </TranslationsProvider>
  );
};

export default AddTaskPage;
