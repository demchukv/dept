import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Login } from '@/app/components/common/login/login';

const i18nNamespaces = ['header', 'home'];

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Login />
    </TranslationsProvider>
  );
}
