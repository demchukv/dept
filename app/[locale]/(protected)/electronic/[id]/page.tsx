import { Metadata } from 'next';

import { ElectronicInfo } from '@/app/components/electronic/electronic-info';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['electronic'];

export const metadata: Metadata = {
  title: 'Dept | Техніка у використанні',
  description: 'Dept - Інформація про техніку у використанні',
};

const ElectronicPage = async ({
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
      <ElectronicInfo />
    </TranslationsProvider>
  );
};

export default ElectronicPage;
