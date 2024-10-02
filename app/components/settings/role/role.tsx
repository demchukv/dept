'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardHeader } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import { NewRole } from '@/app/components/settings/role/new-role';
import { UserList } from '@/app/components/settings/role/user-list';
import { SelectedRole } from '@/app/components/settings/role/selected-role';
import { RoleSettings } from '@/app/components/settings/role/role-settings';

const rolesList = [
  { id: 1, roleName: 'Адміністратор' },
  { id: 2, roleName: 'Фінансист' },
  { id: 3, roleName: 'Тімлід' },
  { id: 4, roleName: 'Девелопер' },
];
const usersList: any = [
  { userId: 1, userName: 'Іванов Іван Іванович', userRoleId: 1 },
  { userId: 2, userName: 'Курбас Іван Леонідович', userRoleId: 2 },
  { userId: 3, userName: 'Петренко Ірина Василівна', userRoleId: 2 },
  { userId: 4, userName: 'Кононов Сергій Сергійович', userRoleId: 3 },
  { userId: 5, userName: 'Жадан Олексій Хомич ', userRoleId: 4 },
  { userId: 6, userName: 'Петров Іван Іванович', userRoleId: 1 },
  { userId: 7, userName: 'Іванов Степан Іванович', userRoleId: 1 },
  { userId: 8, userName: 'Іванов Іван Леонідович', userRoleId: 3 },
  { userId: 9, userName: 'Іванов Іван Леонідович', userRoleId: 4 },
  { userId: 10, userName: 'Іванов Іван Леонідович', userRoleId: 4 },
  { userId: 11, userName: 'Іванов Іван Леонідович', userRoleId: 3 },
  { userId: 12, userName: 'Іванов Іван Леонідович', userRoleId: 2 },
  { userId: 13, userName: 'Іванов Іван Леонідович', userRoleId: 1 },
];

export const Role = () => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [roleForm, setRoleForm] = useState<'users' | 'access'>('users');

  const coutUserForRole = (role: number) => {
    return usersList.filter((user: any) => user.userRoleId === role).length;
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Налаштування. Ролі
        </h1>
      </div>
      <div className="flex flex-col justify-start items-start sm:flex-row gap-6">
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 border-none p-0"
            defaultValue="rolesList"
          >
            <AccordionItem value="rolesList" className="p-0">
              <div className="w-full items-start flex flex-1 gap-2.5 justify-between">
                <p className="font-semibold text-base leading-normal">
                  Перелік ролей
                </p>
                <AccordionTrigger
                  className="p-0 gap-1 sm:gap-9"
                  headClassName="w-auto sm:hidden"
                ></AccordionTrigger>
              </div>
              <AccordionContent className="border-t mt-4 pt-8">
                <div className="flex flex-col gap-4 pb-4">
                  {rolesList.map((role) => (
                    <Button
                      key={role.id}
                      type="button"
                      variant={selectedRole === role.id ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => {
                        selectedRole === role.id
                          ? setSelectedRole(null)
                          : setSelectedRole(role.id);
                      }}
                    >
                      {role.roleName} ({coutUserForRole(role.id)})
                    </Button>
                  ))}
                </div>
                <Separator className="my-4" />
                <NewRole usersList={usersList} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        <div className="w-full sm:min-w-[60%]">
          {selectedRole === null && (
            <UserList rolesList={rolesList} usersList={usersList} />
          )}
          {selectedRole !== null && (
            <>
              {roleForm === 'users' && (
                <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
                  <CardHeader className="py-0">
                    <div>
                      Співробітники ролі{' '}
                      <span className="text-main-color font-semibold">
                        {
                          rolesList.find((role) => role.id === selectedRole)
                            ?.roleName
                        }
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-main-color hover:text-main-dark"
                      onClick={() => setRoleForm('access')}
                    >
                      <Icon
                        iconName="SettingAlert"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </Button>
                  </CardHeader>
                  <Separator className="my-4" />
                  <SelectedRole
                    selectedRole={selectedRole}
                    usersList={usersList}
                  />
                </Card>
              )}

              {roleForm === 'access' && (
                <>
                  <div className="w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 mb-4">
                    <div className="w-auto flex items-center gap-2">
                      <Icon
                        iconName="SettingAlert"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      Налаштування ролі{' '}
                      <span className="text-main-color font-semibold">
                        {
                          rolesList.find((role) => role.id === selectedRole)
                            ?.roleName
                        }
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-main-color hover:text-main-dark text-base justify-start sm:justify-end"
                      onClick={() => setRoleForm('users')}
                    >
                      Співробітники ролі
                    </Button>
                  </div>
                  <RoleSettings selectedRole={selectedRole} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
