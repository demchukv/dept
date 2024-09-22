'use client';
import { useEffect, useState, useTransition } from 'react';
import { getAllFlags } from '@/action/get-flags';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type FlagType = {
  [key: string]: string;
};
export const OrderNumberList = () => {
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<FlagType>({});
  useEffect(() => {
    const getFlags = async () => {
      startTransition(async () => {
        const data = await getAllFlags();
        setFlags(data);
      });
    };
    getFlags();
  }, []);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button type="button" variant="ghost">
          всі номери
        </Button>
        <Button type="button" variant="ghost">
          тільки мобільні
        </Button>
      </div>
      <p className="text-base font-semibold mb-2">Популярні</p>

      {isPending && <p>Завантаження</p>}
      <div className="flex flex-col gap-2">
        {flags &&
          Object.keys(flags).length > 0 &&
          Object.entries(flags).map(([key, value]) => (
            <div key={key} className="flex gap-5">
              <div className="flex items-center justify-center w-6 h-6 text-center overflow-hidden rounded-full object-center flex-shrink-0">
                <Image
                  src={`https://flagcdn.com/h24/${key}.png`}
                  alt={value}
                  width={32}
                  height={24}
                />
              </div>
              <p>{value}</p>
            </div>
          ))}
      </div>
    </>
  );
};
