'use client';

import { SortingState } from '@tanstack/react-table';
import { DataTable } from '@/app/components/data-table/data-table-users-by-role';
import { columns } from '@/app/components/data-table/columns/columns-users-by-role';

interface UserListProps {
  rolesList: any[];
  usersList: any[];
}
export const UserList = ({ rolesList, usersList }: UserListProps) => {
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

  return (
    <>
      <p className="font-semibold text-base leading-normal mb-6">
        Призначені ролі для співробітників
      </p>
      <DataTable
        columns={columns}
        data={UserListExtended}
        rowCount={UserListExtended.length}
        pagination={initPagination}
        sorting={initSorting}
        isPending={false}
        onRemoveUserRole={removeUserRole}
      />
    </>
  );
};
