import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { i18nConfig } from '@/i18nConfig';
import { dir } from 'i18next';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
//TODO: get account type from backend or session
// import { getJson } from '@/data/get-json';
import { Toaster } from '@/components/ui/toaster';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Dept | Дашбоард',
  description: 'Dept - Особистий кабінет клієнта компанії',
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  //TODO: get account type from backend or session
  // const accountData = await getJson('/data/account.json');
  // console.log('accountData', accountData);
  // const accoutType = accountData[0].account;

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={cn(
          montserrat.className,
          'bg-bg-color flex flex-col justify-between ',
          // accoutType === 'user' && 'dark',
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
