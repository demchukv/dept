'use client';

import React from 'react';
import { Icon } from '@/components/utils/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AlertItem } from '@/app/components/header/alert-item';
import { alertTypes } from '@/types/alert';
interface AlertListProps {
  alertData: alertTypes[];
}
export const AlertList = ({ alertData }: AlertListProps) => {
  const [data, setData] = React.useState(alertData);

  const newAlerts = data.filter((item) => !item.read);
  const readAlerts = data.filter((item) => item.read);

  const markAllAsRead = () => {
    setData((prev) => prev.map((item) => ({ ...item, read: true })));
  };
  const markAsRead = (id: string) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  };
  const deleteAlert = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden sm:block outline-none">
          <div className="relative">
            <Icon
              width={24}
              height={24}
              iconName="Bell"
              className="fill-main-dark hover:fill-main-color cursor-pointer"
            />
            {newAlerts.length > 0 && (
              // <span className="block absolute top-0 right-1 w-2 h-2 bg-main-color rounded-full"></span>
              <span className="absolute top-0 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-color opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-main-color"></span>
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[340px] h-[328px] rounded-[6px] py-2 pr-1 pl-0 shadow-[0_6px_40px_0_rgba(89, 125, 137, 0.2)] mr-4 border-none">
          <ScrollArea className="h-[312px] w-[334px] pr-2 border-none px-5">
            {data.length > 0 && newAlerts.length > 0 && (
              <div className="py-2.5 mb-2.5 border-b border-gray-light text-right">
                <span
                  onClick={markAllAsRead}
                  className="text-main-color font-semibold text-xs leading-none cursor-pointer"
                >
                  Позначити всі як прочитані
                </span>
              </div>
            )}
            {/* {data.length > 0 && newAlerts.length === 0 && (
        <div className="py-2.5 mb-2.5 border-b border-gray-light text-right">
          <span className="text-main-color font-semibold text-xs leading-none">
            Всі сповіщення прочитано
          </span>
        </div>
      )} */}
            {data.length === 0 && (
              <div className="py-10 text-center">
                <span className="text-main-color font-semibold text-xs leading-none">
                  У вас немає нових сповіщень
                </span>
              </div>
            )}
            <ul>
              {newAlerts.length > 0 && (
                <>
                  {newAlerts.map((item) => (
                    <AlertItem
                      key={item.id}
                      {...item}
                      markAsRead={markAsRead}
                      deleteAlert={deleteAlert}
                    />
                  ))}
                  <li className="py-2.5 border-b border-gray-light"></li>
                </>
              )}
              {readAlerts.map((item) => (
                <AlertItem
                  key={item.id}
                  {...item}
                  markAsRead={markAsRead}
                  deleteAlert={deleteAlert}
                />
              ))}
            </ul>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
