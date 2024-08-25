import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';
import { Helper } from '@/app/components/helper';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex-grow  flex flex-row-reverse justify-between">
        <main className="flex-grow">Main contet here</main>
        <Aside />
      </div>
      {/* <Helper /> */}
    </>
  );
}
