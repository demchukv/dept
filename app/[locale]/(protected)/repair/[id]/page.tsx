import { Metadata } from 'next';

import { RepairInfo } from '@/app/components/repair/repair-info';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['repair'];

export const metadata: Metadata = {
  title: 'Dept | Ремонт техніки',
  description: 'Dept - Список заявок на ремонт техніки',
};

const RepairPage = async ({
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
      <RepairInfo />
    </TranslationsProvider>
  );
};

export default RepairPage;
