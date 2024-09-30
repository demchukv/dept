import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Role } from '@/app/components/settings/role/role';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Налаштування. Ролі',
  description: 'Dept - Налаштування. Ролі',
};

const SettingsRolePage = async ({
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
      <Role />
    </TranslationsProvider>
  );
};

export default SettingsRolePage;
