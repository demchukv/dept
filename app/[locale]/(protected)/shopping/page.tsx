import { Metadata } from 'next';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Shopping } from '@/app/components/shopping/shopping';

const i18nNamespaces = ['shopping'];

export const metadata: Metadata = {
  title: 'Dept | Покупки',
  description: 'Dept - Список покупок, відстеження, статус',
};

const ShoppingPage = async ({
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
      <Shopping />
    </TranslationsProvider>
  );
};

export default ShoppingPage;
