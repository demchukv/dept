import React from 'react';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['shopping'];

const ShoppingPage = async ({
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
      <div>Shopping Page</div>
    </TranslationsProvider>
  );
};

export default ShoppingPage;
