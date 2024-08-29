import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
//TODO: get account type from backend or session
import { getJson } from '@/data/get-json';
import { Toaster } from '@/components/ui/toaster';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Dept | Дашбоард',
  description: 'Dept - Особистий кабінет клієнта компанії',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //TODO: get account type from backend or session
  const accountData = await getJson('/data/account.json');
  const accoutType = accountData.account;

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          montserrat.className,
          'bg-bg-color flex flex-col justify-between pt-[63px] md:pt-[69px] lg:pl-[234px]',
          accoutType === 'user' && 'dark',
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
