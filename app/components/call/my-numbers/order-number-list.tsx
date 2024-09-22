'use client';
import { useEffect, useState, useTransition } from 'react';
import { getAllFlags } from '@/action/get-flags';
import { Button } from '@/components/ui/button';
import { Loading } from '@/app/components/common/loading';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  DataTable,
  PaginationState,
} from '@/app/components/data-table/data-table-phone-numbers';
import { columns } from '@/app/components/data-table/columns/columns-phone-numbers';
import { FlagType } from '@/types/call';

export const OrderNumberList = () => {
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<FlagType[]>([]);
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

  const getFlags = async () => {
    startTransition(async () => {
      const data = await getAllFlags();
      setFlags(data);
      const randomCountries = data.slice(0, 10).sort(() => Math.random() - 0.5);
      setPopularCountries(randomCountries);
    });
  };

  useEffect(() => {
    getFlags();
  }, []);

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

      {isPending && <Loading />}

      {flags && flags.length > 0 && (
        <>
          <DataTable
            columns={columns}
            data={flags}
            rowCount={flags.length}
            pagination={initPagination}
            sorting={initSorting}
            isPending={isPending}
          />
        </>
      )}
    </>
  );
};
