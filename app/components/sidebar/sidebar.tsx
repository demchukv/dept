import { Button } from '@/components/ui/button';
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
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle className="hidden">Side navigation menu</SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <div className="grid gap-4">
            <Link href="/" className={linkClass}>
              <Icon width={24} height={24} iconName="Dashboard" />
              Дашбоард
            </Link>
            <Link href="/balans" className={linkClass}>
              <Icon width={24} height={24} iconName="Balans" />
              Баланс
            </Link>
            <Link href="/profile" className={linkClass}>
              <Icon width={24} height={24} iconName="User" />
              Мої дані
            </Link>
            <Link href="/bag" className={linkClass}>
              <Icon width={24} height={24} iconName="Bag" />
              Покупки
            </Link>
            <Link href="/task" className={linkClass}>
              <Icon width={24} height={24} iconName="Task" />
              Заявки / Задачі
            </Link>
            <Link href="/repair" className={linkClass}>
              <Icon width={24} height={24} iconName="Repair" />
              Ремонт техніки
            </Link>
            <Link href="/product" className={linkClass}>
              <Icon width={24} height={24} iconName="Product" />
              Мої продукти
            </Link>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};
