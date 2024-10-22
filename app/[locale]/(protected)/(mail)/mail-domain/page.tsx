import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { MailDomain } from '@/app/components/mail/mail-domain/mail-domain';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Корпоративна пошта. Домени',
  description: 'Dept - Корпоративна пошта. Домени',
};

const MailDomainPage = async ({
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
      <MailDomain />
    </TranslationsProvider>
  );
};

export default MailDomainPage;
