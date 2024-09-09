import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Task } from '@/app/components/task/task';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Заявки / Задачі',
  description: 'Dept - Список ваших заявок та задач',
};
const TaskPage = async ({
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
      <Task />
    </TranslationsProvider>
  );
};

export default TaskPage;
