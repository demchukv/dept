import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Телефонія: сценарії',
  description: 'Dept - Сценарії - управління номерами',
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
      {/* <Certificate /> */}
      <p>Телефонія: сценарії</p>
    </TranslationsProvider>
  );
};

export default CertificatePage;