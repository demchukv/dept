import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex-grow flex flex-row-reverse justify-between">
        <main className="flex-grow px-4 py-6 sm:py-5 lg:px-[30px] lg:py-6">
          Main content here
        </main>
        <Aside />
      </div>
    </>
  );
}
