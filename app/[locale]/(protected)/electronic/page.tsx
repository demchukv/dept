import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Electronic } from '@/app/components/electronic/electronic';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Техніка та девайси',
  description: 'Dept - Техніка та девайси у використанні',
};

const ElectronicPage = async ({
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
      <Electronic />
    </TranslationsProvider>
  );
};

export default ElectronicPage;