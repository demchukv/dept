import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { i18nConfig } from '@/i18nConfig';
import { dir } from 'i18next';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import StoreProvider from '@/app/StoreProvider';
import AuthProvider from '@/hooks/session-provider';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]';

import { SpeedInsights } from '@vercel/speed-insights/next';

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
  // const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/vzcom0q3xyachjccsrp6lq7hp8jglfvl.png"
        />
      </head>
      <body
        className={cn(
          montserrat.className,
          'bg-bg-color flex flex-col justify-between ',
        )}
      >
        <NextTopLoader
          color="var(--main-color)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        <StoreProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
          <SpeedInsights />
        </StoreProvider>
      </body>
    </html>
  );
}
