import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Department } from '@/app/components/settings/department/department';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Налаштування. Відділи',
  description: 'Dept - Налаштування. Відділи',
};

const SettingsDepartmentPage = async ({
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
      <Department />
    </TranslationsProvider>
  );
};

export default SettingsDepartmentPage;
