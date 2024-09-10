import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';
import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['header'];
interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function ProtectedLayout({
  children,
  params: { locale },
}: LayoutProps) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />

      <div className="flex-grow flex flex-row-reverse">
        <main className="flex-grow px-4 py-6 sm:py-5 lg:px-[30px] lg:py-6 lg:ml-[234px] mt-[63px] md:mt-[69px] max-w-[100%] lg:max-w-[calc(100%-234px)]">
          {children}
        </main>

        <Aside />
      </div>
    </TranslationsProvider>
  );
}
