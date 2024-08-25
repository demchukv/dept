import { Header } from '@/app/components/header/header';
import { Aside } from '@/app/components/sidebar/aside';

interface LayoutProps {
  children: React.ReactNode;
}
export default function ProtectedLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="flex-grow  flex flex-row-reverse justify-between">
        <main className="flex-grow">{children}</main>
        <Aside />
      </div>
    </>
  );
}
