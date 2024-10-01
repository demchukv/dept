import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icon } from '@/components/utils/icon';
import { Checkbox } from '@/components/ui/checkbox';
import React, { useEffect, useState } from 'react';

interface AddEmployeeProps {
  usersList: any;
  usersForRole: any;
  setUsersForRole: React.Dispatch<React.SetStateAction<object[]>>;
}
export const AddEmployee = ({
  usersList,
  usersForRole,
  setUsersForRole,
}: AddEmployeeProps) => {
  const [open, setOpen] = useState(false);
  const [userFind, setUserFind] = useState('');
  const [checkedUsers, setCheckedUsers] = useState<number[]>(
    usersForRole.map((user: any) => user.userId),
  );
  const [filteredUsers, setFilteredUsers] = useState(usersList);

  const removeUserFromChecked = (userId: number) => {
    setCheckedUsers(checkedUsers.filter((id) => id !== userId));
  };

  const addUsersToRole = () => {
    let users: any = [];
    checkedUsers.map((userId) =>
      users.push(usersList.find((item: any) => item.userId === userId)),
    );
    setUsersForRole(users);
    setOpen(false);
  };

  useEffect(() => {
    if (userFind.trim() === '') {
      return;
    }
    const userFindLower = userFind.toLowerCase();
    const userFindRegexp = new RegExp(userFindLower, 'i');
    const userFindResult = usersList.filter((user) =>
      userFindRegexp.test(user.userName.toLowerCase()),
    );
    setFilteredUsers(userFindResult);
  }, [userFind]);

  useEffect(() => {
    setCheckedUsers(usersForRole.map((user: any) => user.userId));
  }, [usersForRole]);

  return (
    <>
      <div className="w-full flex justify-start items-start flex-col gap-4 sm:flex-row">
        <>
          {checkedUsers.length > 0 && (
            <div className="w-full mb-4 flex flex-col gap-3">
              {checkedUsers.map((userId) => (
                <div
                  key={userId}
                  className="rounded border border-gray-light px-5 py-4 font-medium flex items-center justify-between gap-2"
                >
                  {usersList.find((user) => user.userId === userId)?.userName}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      removeUserFromChecked(userId);
                    }}
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
              ))}
            </div>
          )}
          {checkedUsers.length === 0 && (
            <div className="w-full rounded border border-gray-light px-5 py-4 font-medium flex items-center justify-between gap-2 mb-4">
              Не додано жодного співробітника
            </div>
          )}
          {open && (
            <div className="w-full">
              <div className="bg-bg-color border border-gray-light rounded py-4 px-3 mb-4">
                <p className="font-medium mb-3">Додати співробітника</p>
                <div className="border border-gray-light bg-white rounded">
                  <div className="px-3 pr-4 pt-2">
                    <Input
                      type="text"
                      name="userFind"
                      value={userFind}
                      onChange={(e) => setUserFind(e.target.value)}
                      placeholder="Пошук по співробітниках"
                    />
                  </div>
                  <ScrollArea className="h-52 mt-2 p-3 pr-4">
                    {filteredUsers.map((user) => (
                      <label
                        key={user.userId}
                        className="flex items-center gap-2 pb-4 font-medium"
                      >
                        <Checkbox
                          checked={checkedUsers.includes(user.userId)}
                          onCheckedChange={() => {
                            if (checkedUsers.includes(user.userId)) {
                              setCheckedUsers(
                                checkedUsers.filter((id) => id !== user.userId),
                              );
                            } else {
                              setCheckedUsers([...checkedUsers, user.userId]);
                            }
                          }}
                        />
                        <span>{user.userName}</span>
                      </label>
                    ))}
                    <ScrollBar orientation="vertical" forceMount={true} />
                  </ScrollArea>
                </div>
              </div>
              <Button
                type="button"
                className="w-full mb-4"
                onClick={() => {
                  addUsersToRole();
                }}
              >
                Зберегти зміни
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Відмінити
              </Button>
            </div>
          )}
        </>
        {!open && (
          <Button
            type="button"
            variant="outline"
            className="border-0 hover:shadow-none px-0 py-0 bg-transparent"
            onClick={() => setOpen(true)}
          >
            Додати співробітника <Icon iconName="Plus" width={20} height={20} />
          </Button>
        )}
      </div>
    </>
  );
};
