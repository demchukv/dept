import React from 'react';
import { Card } from '@/app/components/card/card';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/utils/icon';

interface DepartmentItemProps {
  department: any;
}
export const DepartmentItem = ({ department }: DepartmentItemProps) => {
  return (
    <div>
      <div className="mb-4">
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 w-[280px] ">
          <div className="flex items-center justify-between mb-3">
            <div
              className={cn('font-semibold text-base leading-main-lh')}
              style={{ color: department.color }}
            >
              {department.name}
            </div>
            <div>Icons</div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="bg-transparent">
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
        </Card>
      </div>
      {/* <div className="border-l-[2px] border-gray-medium pl-5 flex gap-4 items-start">
        {department.sub.map((depart: any) => (
          <DepartmentItem department={depart} key={depart.id} />
        ))}
      </div> */}
    </div>
  );
};
