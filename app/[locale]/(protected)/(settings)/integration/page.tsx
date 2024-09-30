import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Integration } from '@/app/components/settings/integration/integration';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Налаштування. Інтеграції',
  description: 'Dept - Налаштування. Інтеграції',
};

const SettingsIntegrationPage = async ({
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
      <Integration />
    </TranslationsProvider>
  );
};

export default SettingsIntegrationPage;
