'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '../../card/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { SortingState } from '@tanstack/react-table';
import { SmsListPaging } from '../../call/my-numbers/sms-list-paging';

const initPagination = {
  pageIndex: 0,
  pageSize: 5,
};
const initSorting: SortingState = [
  {
    id: 'date',
    desc: false,
  },
];

interface UserListProps {
  rolesList: any[];
  usersList: any[];
}
export const UserList = ({ rolesList, usersList }: UserListProps) => {
  const [users, setUsers] = useState(usersList);
  const [pagination, setPagination] = useState(initPagination);
  const [sorting, setSorting] = useState<SortingState>(initSorting);

  useEffect(() => {
    //TODO: fetch real data
    console.log(pagination, sorting);
  }, [pagination, sorting]);

  return (
    <>
      <p className="font-semibold text-base leading-normal mb-6">
        Призначені ролі для співробітників
      </p>
      <Card className="hidden max-w-[100%] sm:grid grid-cols-[auto_auto_auto] shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-0 md:p-0 lg:p-0 overflow-hidden">
        <div className="pl-8 pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
          Співробітник
        </div>
        <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
          Роль
        </div>
        <div className="pr-8 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
          &nbsp;
        </div>
        {users.map((user, index) => (
          <React.Fragment key={user.userId}>
            <div
              className={cn(
                'pl-7 pr-6 py-[18px] flex items-center justify-between gap-2 text-sm font-medium leading-main-lh',
                index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
              )}
            >
              {user.userName}
            </div>
            <div
              className={cn(
                'pr-5 py-[18px] text-sm font-medium text-main-color leading-main-lh place-content-center',
                index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
              )}
            >
              {rolesList.find((role) => role.id === user.userRoleId)?.roleName}
            </div>
            <div
              className={cn(
                'pr-7 py-[18px] place-content-center text-sm text-right font-medium leading-main-lh',
                index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
              )}
            >
              <Button
                type="button"
                variant="ghost"
                className="text-warning hover:text-main-dark"
              >
                <Icon
                  iconName="Trash"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Button>
            </div>
          </React.Fragment>
        ))}
        <SmsListPaging
          pagination={pagination}
          setPagination={setPagination}
          pages={Math.ceil(users.length / pagination.pageSize) || 0}
          className="col-span-3"
        />
      </Card>
    </>
  );
};
