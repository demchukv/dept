import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { InternalLines } from '@/app/components/call/internal-lines/internal-lines';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Телефонія: Внутрішні лінії',
  description: 'Dept - Список внутрішніх ліній телефонії',
};

const CertificatePage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <InternalLines />
    </TranslationsProvider>
  );
};

export default CertificatePage;
