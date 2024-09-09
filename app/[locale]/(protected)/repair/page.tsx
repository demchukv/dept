import React from 'react';
import { Metadata } from 'next';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['repair'];

export const metadata: Metadata = {
  title: 'Dept | Ремонт техніки',
  description: 'Dept - Список заявок на ремонт техніки',
};

const RepairPage = async ({
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
      <div>Repair Page</div>
    </TranslationsProvider>
  );
};

export default RepairPage;
