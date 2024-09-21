'use client';
import { useEffect, useState } from 'react';
import { getAllFlags } from '@/action/get-flags';
import Image from 'next/image';

type FlagType = {
  [key: string]: string;
};
export const OrderNumberList = () => {
  const [flags, setFlags] = useState<FlagType>({});
  useEffect(() => {
    const getFlags = async () => {
      const data = await getAllFlags();
      setFlags(data);
    };
    getFlags();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {flags &&
        Object.keys(flags).length > 0 &&
        Object.entries(flags).map(([key, value]) => (
          <div key={key} className="flex gap-5">
            <p className="w-6 h-6 object-cover rounded-full">
              <Image
                src={`https://flagcdn.com/h24/${key}.png`}
                alt={value}
                width={32}
                height={24}
              />
            </p>
            <p>{value}</p>
          </div>
        ))}
    </div>
  );
};
