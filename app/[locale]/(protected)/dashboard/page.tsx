import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';
import { Dashboard } from '@/app/components/dashboard/dashboard';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['header', 'home'];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Dashboard />
    </TranslationsProvider>
  );
}
