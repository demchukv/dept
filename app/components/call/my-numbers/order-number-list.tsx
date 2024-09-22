'use client';
import { useEffect, useState, useTransition } from 'react';
import { getAllFlags } from '@/action/get-flags';
import Image from 'next/image';
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
  const [rowCount, setRowCount] = useState(0);

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
  const initFiltering = [] as ColumnFiltersState;

  const getFlags = async () => {
    startTransition(async () => {
      const data = await getAllFlags();
      setFlags(data);
    });
  };

  useEffect(() => {
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
      <p className="text-base font-semibold mb-2">Популярні країни</p>
      <div>List of popular countries</div>

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

          {/* <div className="flex flex-col gap-2">
            {flags.map((item) => (
              <div key={item.iso3} className="flex gap-5">
                <div className="flex items-center justify-center w-6 h-6 text-center overflow-hidden rounded-full object-cover flex-shrink-0">
                  <Image
                    src={item.flag}
                    alt={item.name}
                    width={24}
                    height={24}
                    style={{
                      objectFit: 'cover',
                      height: '24px',
                      width: 'auto',
                    }}
                  />
                </div>
                <p>
                  {item.iso2} - {item.iso3} - {item.name}
                </p>
              </div>
            ))}
          </div> */}
        </>
      )}
    </>
  );
};
