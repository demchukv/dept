import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { MailGroup } from '@/app/components/mail/mail-group/mail-group';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Корпоративна пошта. Групи',
  description: 'Dept - Корпоративна пошта. Групи',
};

const MailGroupPage = async ({
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
      <MailGroup />
    </TranslationsProvider>
  );
};

export default MailGroupPage;
