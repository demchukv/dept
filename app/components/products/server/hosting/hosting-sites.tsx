'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HostingSitesOptionModal } from '@/app/components/products/server/hosting/hosting-sites-option-modal';

interface HostingSitesProps {
  data: ServerType;
}
export const HostingSites = ({ data }: HostingSitesProps) => {
  const [search, setSearch] = useState<string>('');
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const [modalData, setModalData] = useState<any>(null);

  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);
  useEffect(() => {
    if (search.trim() === '') return;
    console.log(search);
  }, [search]);
  return (
    <>
      {/* Перший екран */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <p className="sm:hidden flex justify-between text-xs text-gray-dark mb-4">
            Доступно сайтів: <span>1/1</span>
          </p>
          <p className="font-semibold mb-2">
            Сайти на тарифі “Хостинг Базовий”
          </p>
          <p>
            Наразі у вас немає підключених сайтів/доменів до послуги хостингу
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <p className="hidden sm:block text-xs text-gray-dark mb-2">
            Доступно сайтів: 1/1
          </p>
          <Button type="button" className="w-full sm:w-auto">
            Додати
            <Icon iconName="Plus" width={20} height={20} />
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      {/* Другий екран */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
            Доступно сайтів: <span>1/1</span>
          </p>
          <p className="font-semibold mb-2">
            Сайти на тарифі “Хостинг Базовий”
          </p>
          <div>
            <label className="text-xs text-gray-dark">
              *Приклад “mywebsite.com” без www та http
            </label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Введіть назву домену сайту"
            />
            <span>{search}</span>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <p className="hidden sm:block text-xs text-gray-dark mb-2">
            Доступно сайтів: 1/1
          </p>
          <Button type="button" className="w-full sm:w-auto">
            Зберегти
          </Button>
        </div>
      </div>
      <Separator className="my-6" />
      {/* Третій екран */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
            Доступно сайтів: <span>1/2</span>
          </p>
          <p className="font-semibold mb-2">
            Сайти на тарифі “Хостинг Базовий”
          </p>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 font-medium text-base leading-normal">
              mywebsite.com
              <Button
                type="button"
                variant="ghost"
                className="text-main-color"
                onClick={() => {
                  setModalData('mywebsite.com');
                  setOpen(true);
                }}
              >
                <Icon iconName="Settings" width={24} height={24} />
              </Button>
            </li>
            <li className="flex items-center gap-2 font-medium text-base leading-normal">
              onemorewebsite.com
              <Button
                type="button"
                variant="ghost"
                className="text-main-color"
                onClick={() => {
                  setModalData('onemorewebsite.com');
                  setOpen(true);
                }}
              >
                <Icon iconName="Settings" width={24} height={24} />
              </Button>
            </li>
          </ul>
          <HostingSitesOptionModal
            open={open}
            onClose={onClose}
            data={modalData}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Button type="button" className="w-full sm:w-auto">
            Додати
            <Icon iconName="Plus" width={20} height={20} />
          </Button>
          <p className="hidden sm:block text-xs text-gray-dark mt-2">
            Доступно сайтів: 1/2
          </p>
        </div>
      </div>
    </>
  );
};
