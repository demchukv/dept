import { Metadata } from 'next';
import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Subscription } from '@/app/components/products/subscription/subscription';

const i18nNamespaces = ['task'];
export const metadata: Metadata = {
  title: 'Dept | Підписки: Мої продукти',
  description: 'Dept - Інформація про ваші підписки',
};
const SubscriptionPage = async ({
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
      <Subscription />
    </TranslationsProvider>
  );
};

export default SubscriptionPage;
