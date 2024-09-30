import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Employee } from '@/app/components/settings/employee/employee';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Налаштування. Співробітники',
  description: 'Dept - Налаштування. Співробітники',
};

const SettingsEmployeePage = async ({
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
      <Employee />
    </TranslationsProvider>
  );
};

export default SettingsEmployeePage;
