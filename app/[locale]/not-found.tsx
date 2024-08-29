import Link from 'next/link';
import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';

export default function NotFound() {
  return (
    <>
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
    </>
  );
}
