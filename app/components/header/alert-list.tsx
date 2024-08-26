'use client';

import React from 'react';

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
    </>
  );
};
