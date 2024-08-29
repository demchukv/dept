import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';
import { Dashboard } from '@/app/components/dashboard/dashboard';

export default async function Home() {
  return (
    <>
      <Header />

      <main className="flex-grow px-4 py-6 sm:py-5 lg:px-[30px] lg:py-6  lg:ml-[234px] mt-[63px] md:mt-[69px] ">
        <Dashboard />
      </main>

      <Aside />
    </>
  );
}
