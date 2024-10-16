import React from 'react';
import { Card } from '@/app/components/card/card';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/utils/icon';
import { DepartmentEmployees } from '@/app/components/settings/department/department-employees';

interface DepartmentItemProps {
  department: any;
  color?: string;
}
export const DepartmentItem = ({ department, color }: DepartmentItemProps) => {
  return (
    <div className="flex-flex-col gap-4">
      <div
        className={cn(department.sub && department.sub.length > 0 && 'mb-4')}
      >
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 w-[280px] ">
          <div className="flex items-center justify-between mb-3">
            <div
              className={cn('font-semibold text-base leading-main-lh')}
              style={{ color: color ? color : department?.color }}
            >
              {department.name}
            </div>
            <div>Icons</div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="bg-transparent w-8 h-8">
              <AvatarImage
                src={department.manager.avatar}
                alt={department.manager.name}
                className="w-8 h-8 bg-transparent"
              />
              <AvatarFallback>
                <Icon
                  iconName="AvatarUser"
                  width={32}
                  height={32}
                  className="w-8 h-8 fill-gray-medium"
                />
              </AvatarFallback>
            </Avatar>
            <div className="font-medium leading-main-lh">
              {department.manager.name}
            </div>
          </div>
          {department.employees && department.employees.length > 0 && (
            <DepartmentEmployees employees={department.employees} />
          )}
        </Card>
      </div>
      {department.sub && department.sub.length > 0 && (
        <div className="border-l-[2px] border-gray-medium pl-5 flex flex-col gap-4 items-start">
          {department.sub.map((depart: any) => (
            <DepartmentItem
              department={depart}
              color={color ? color : department.color}
              key={depart.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
