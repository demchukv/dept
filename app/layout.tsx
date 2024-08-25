import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import accountData from '@/data/account.json';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Dept | Дашбоард',
  description: 'Dept - Особистий кабінет клієнта компанії',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: get account type from backend or session
  const accoutType = accountData.account;

  return (
    <html lang="en">
      <body
        className={cn(
          montserrat.className,
          'bg-bg-color flex flex-col justify-between',
          accoutType === 'user' && 'dark',
        )}
      >
        {children}
      </body>
    </html>
  );
}
