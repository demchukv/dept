import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { MailHistory } from '@/app/components/mail/mail-history/mail-history';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Корпоративна пошта. Журнал',
  description: 'Dept - Корпоративна пошта. Журнал',
};

const MailHistoryPage = async ({
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
      <MailHistory />
    </TranslationsProvider>
  );
};

export default MailHistoryPage;
