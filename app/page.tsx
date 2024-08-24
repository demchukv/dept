import { Header } from '@/app/components/header/header';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="w-full py-3 mt-20 bg-yellow-500 xs:bg-orange-500 sm:bg-red-500 md:bg-blue-500 lg:bg-green-500 xl:bg-violet-500">
          <div className="xs:hidden sm:hidden md:hidden lg:hidden xl:hidden">
            to xs:390
          </div>
          <div className="hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden">
            from xs:390 to sm:834
          </div>
          <div className="hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden">
            from sm:834 to md:1194
          </div>
          <div className="hidden xs:hidden sm:hidden md:block lg:hidden xl:hidden">
            from md:1194 to lg:1440
          </div>
          <div className="hidden xs:hidden sm:hidden md:hidden lg:block xl:hidden">
            from lg:1440 to xl:1920
          </div>
          <div className="hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block">
            from xl:1920
          </div>
        </div>
      </main>
    </>
  );
}
