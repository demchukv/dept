import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Server } from '@/app/components/products/server/server';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Сервери і хостинг: Мої продукти',
  description: 'Dept - Інформація про ваші сервери і хостинг',
};
const ServerPage = async ({
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
      <Server />
    </TranslationsProvider>
  );
};

export default ServerPage;
