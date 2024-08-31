import Link from 'next/link';
import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';

import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

const i18nNamespaces = ['header'];

interface CatchAllPage {
  params: { locale: string };
}
// { params: { locale } }: CatchAllPage
export default async function NotFound({ locale = 'uk' }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <Header />
      <div className="flex-grow flex flex-row-reverse justify-between">
        <main className="flex-grow px-4 py-6 sm:py-5 lg:px-[30px] lg:py-6">
          <div className="w-full h-screen flex flex-col gap-3 pt-20 items-center">
            <h2 className="text-3xl text-main-dark">404: Not Found</h2>
            <p className="text-main-dark text-lg text-center">
              Сторінка не знайдена.
              <br />
              Для навігації по сайту використовуйте меню.
            </p>
            <Link href="/" className="text-main-color">
              На головну сторінку
            </Link>
          </div>
        </main>
        <Aside />
      </div>
    </TranslationsProvider>
  );
}
