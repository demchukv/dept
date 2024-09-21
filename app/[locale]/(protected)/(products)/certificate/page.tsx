import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Certificate } from '@/app/components/products/certificate/certificate';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Сертифікати: Мої продукти',
  description: 'Dept - Інформація про ваші сертифікати',
};

const CertificatePage = async ({
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
      <Certificate />
    </TranslationsProvider>
  );
};

export default CertificatePage;
