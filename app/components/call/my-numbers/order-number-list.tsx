'use client';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';

import { SortingState } from '@tanstack/react-table';
import { DataTable } from '@/app/components/data-table/data-table-phone-numbers';
import { columns } from '@/app/components/data-table/columns/columns-phone-numbers';
import { FlagType } from '@/types/call';

interface OrderNumberListProps {
  setOrderStep: ({ step, iso2 }: { step: number; iso2: string }) => void;
  flags: FlagType[];
}
export const OrderNumberList = ({
  setOrderStep,
  flags,
}: OrderNumberListProps) => {
  const [popularCountries, setPopularCountries] = useState<FlagType[]>([]);

  const initPagination = {
    pageIndex: 0,
    pageSize: 10,
  };
  const initSorting: SortingState = [
    {
      id: 'name',
      desc: false,
    },
  ];

  useEffect(() => {
    const randomCountries = flags.slice(0, 10).sort(() => Math.random() - 0.5);
    setPopularCountries(randomCountries);
  }, [flags]);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button type="button" variant="ghost" className="text-main-color">
          всі номери
        </Button>
        <Button type="button" variant="ghost" className="text-gray-medium">
          тільки мобільні
        </Button>
      </div>
      <p className="text-base font-semibold mb-2">Популярні країни</p>
      <div className="mb-4 flex gap-6 overflow-x-auto">
        {popularCountries &&
          popularCountries.length > 0 &&
          popularCountries.map((country) => (
            <div key={country.iso3} className="flex items-center gap-2">
              <div className="bg-orange-additional-color rounded text-xs text-white text-semibold px-2 py-1 flex-shrink-0">
                {country.phoneCode?.startsWith('+')
                  ? country.phoneCode
                  : `+${country.phoneCode}`}
              </div>
              <div className="whitespace-nowrap text-base font-medium">
                {country.name}
              </div>
            </div>
          ))}
      </div>

      {flags && flags.length > 0 && (
        <>
          <DataTable
            columns={columns}
            data={flags}
            rowCount={flags.length}
            pagination={initPagination}
            sorting={initSorting}
            isPending={false}
            setOrderStep={setOrderStep}
          />
        </>
      )}
    </>
  );
};
