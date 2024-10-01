import React, { useEffect, useState } from 'react';
import { AddEmployee } from '@/app/components/settings/role/add-employee';

interface SelectedRoleProps {
  selectedRole: number;
  usersList: any;
}
export const SelectedRole = ({
  selectedRole,
  usersList,
}: SelectedRoleProps) => {
  const [usersForRole, setUsersForRole] = useState<any>(
    usersList.filter((user: any) => user.userRoleId === selectedRole),
  );

  useEffect(() => {
    setUsersForRole(
      usersList.filter((user: any) => user.userRoleId === selectedRole),
    );
  }, [selectedRole]);

  return (
    <>
      <AddEmployee
        usersForRole={usersForRole}
        setUsersForRole={setUsersForRole}
      />
    </>
  );
};
