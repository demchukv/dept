import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { MailAccount } from '@/app/components/mail/mail-account/mail-account';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Корпоративна пошта. Акаунти',
  description: 'Dept - Корпоративна пошта. Акаунти',
};

const MailAccountPage = async ({
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
      <MailAccount />
    </TranslationsProvider>
  );
};

export default MailAccountPage;
