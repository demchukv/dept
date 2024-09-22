'use client';
import { useEffect, useState, useTransition } from 'react';
import { getAllFlags } from '@/action/get-flags';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loading } from '@/app/components/common/loading';

// type FlagType = {
//   [key: string]: string;
// };
type FlagType = {
  flag: string;
  iso2: string;
  iso3: string;
  name: string;
};
export const OrderNumberList = () => {
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<FlagType[]>([]);
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

      {isPending && <Loading />}
      <div className="flex flex-col gap-2">
        {flags &&
          flags.length > 0 &&
          flags.map((item) => (
            <div key={item.iso3} className="flex gap-5">
              <div className="flex items-center justify-center w-6 h-6 text-center overflow-hidden rounded-full object-cover flex-shrink-0">
                <Image
                  src={item.flag}
                  alt={item.name}
                  width={24}
                  height={24}
                  style={{ objectFit: 'cover', height: '24px', width: 'auto' }}
                />
              </div>
              <p>
                {item.iso2} - {item.iso3} - {item.name}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};
