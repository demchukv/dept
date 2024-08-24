import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Icon } from '@/components/utils/icon';
import { SideMenu } from '@/app/components/sidebar/side-menu';

export const Sidebar = () => {
  const linkClass = 'flex gap-2';
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Icon
            width={24}
            height={24}
            iconName="Menu"
            className="fill-main-dark hover:fill-main-color cursor-pointer transition-all"
          />
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="p-0 pt-10 flex flex-col justify-between items-start"
        >
          <SheetHeader>
            <SheetTitle className="hidden">Side navigation menu</SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>

          <SideMenu />

          <SheetFooter className="p-6 text-left sm:justify-start text-warning">
            <SheetClose asChild>
              <Link href="/call" className={linkClass}>
                <Icon
                  width={24}
                  height={24}
                  iconName="Logout"
                  className="fill-warning"
                />
                Вийти
              </Link>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
