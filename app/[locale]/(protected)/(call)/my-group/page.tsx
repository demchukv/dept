import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Groups } from '@/app/components/call/groups/groups';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Телефонія: Мої групи',
  description: 'Dept - Групи телефонних дзвінків',
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
      <Groups />
    </TranslationsProvider>
  );
};

export default CertificatePage;
