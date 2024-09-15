import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Domain } from '@/app/components/products/domain/domain';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Домени: Мої продукти',
  description: 'Dept - Інформація про ваші домени',
};
const DomainPage = async ({
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
      <Domain />
    </TranslationsProvider>
  );
};

export default DomainPage;
