'use client';

import { SortingState } from '@tanstack/react-table';
import { DataTable } from '@/app/components/data-table/data-table-users-by-role';
import { columns } from '@/app/components/data-table/columns/columns-users-by-role';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { UserSortModal } from '@/app/components/settings/role/user-sort-modal';
import { useEffect, useState } from 'react';

const initPagination = {
  pageIndex: 0,
  pageSize: 10,
};
const initSorting: SortingState = [
  {
    id: 'userName',
    desc: false,
  },
];

interface UserListProps {
  rolesList: any[];
  usersList: any[];
}
export const UserList = ({ rolesList, usersList }: UserListProps) => {
  const [pagination, setPagination] = useState(initPagination);
  const [sorting, setSorting] = useState(initSorting);
  const [sort, setSort] = useState('userName');

  const UserListExtended = usersList.map((item: any) => {
    return {
      ...item,
      roleName: rolesList.filter((role: any) => item.userRoleId === role.id)[0]
        .roleName,
    };
  });

  const removeUserRole = (userId: number) => {
    console.log('remove user from role: ', userId);
  };

  const applySorting = (sort: string) => {
    if (sort === 'userName') {
      setSorting([
        {
          id: 'userName',
          desc: sorting[0].desc ? false : true,
        },
      ]);
    }
    if (sort === 'roleName') {
      setSorting([
        {
          id: 'roleName',
          desc: sorting[0].desc ? false : true,
        },
      ]);
    }
  };

  useEffect(() => {
    applySorting(sort);
  }, [sort]);
  // console.log(sorting);
  return (
    <>
      <div className="flex gap-2 items-center justify-between">
        <UserSortModal
          sort={sort}
          setSort={setSort}
          applySorting={applySorting}
        />

        <p className="font-semibold text-base leading-normal sm:mb-6">
          Призначені ролі для співробітників
        </p>
      </div>
      <Separator className="my-6 sm:hidden" />
      <DataTable
        columns={columns}
        data={UserListExtended}
        rowCount={UserListExtended.length}
        pagination={pagination}
        sorting={sorting}
        isPending={false}
        onRemoveUserRole={removeUserRole}
      />
    </>
  );
};
