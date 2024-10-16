import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/utils/icon';

interface DepartmentEmployeesProps {
  employees: any[];
}
export const DepartmentEmployees = ({
  employees,
}: DepartmentEmployeesProps) => {
  return (
    <>
      <Separator className="my-4" />

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-4 border-none p-0"
        defaultValue={undefined}
      >
        <AccordionItem value="employeesList" className="p-0">
          <AccordionTrigger className="p-0 gap-2 justify-start flex-grow w-full">
            <div className="flex items-center gap-0">
              {employees.map((employee) => (
                <p key={employee.id}>a</p>
              ))}
            </div>
            <div className="text-xs font-medium leading-main-lh">
              {employees.length} співробітники
            </div>
          </AccordionTrigger>
          <AccordionContent className="border-0 mt-4 flex flex-col gap-2">
            {employees.map((employee) => (
              <div key={employee.id} className="flex items-center gap-2">
                <Avatar className="bg-transparent w-5 h-5">
                  <AvatarImage
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-5 h-5 bg-transparent"
                  />
                  <AvatarFallback>
                    <Icon
                      iconName="AvatarUser"
                      width={20}
                      height={20}
                      className="w-5 h-5 fill-gray-medium"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium text-xs leading-main-lh">
                  {employee.name}
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
