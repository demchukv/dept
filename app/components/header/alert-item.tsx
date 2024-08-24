import React from 'react';
import { Icon } from '@/components/utils/icon';

export interface AlertItemProps {
  id: string;
  title: string;
  description: string;
  read: boolean;
  markAsRead: (id: string) => void;
  deleteAlert: (id: string) => void;
}
export const AlertItem = ({
  id,
  title,
  description,
  read,
  markAsRead,
  deleteAlert,
}: AlertItemProps) => {
  return (
    <li className="py-2.5">
      <div className="mb-1 flex gap-2 justify-between items-center">
        <p className="flex-grow">
          {!read && (
            <span className="inline-block w-2 h-2 bg-main-color rounded-full mr-1"></span>
          )}
          <span className="text-main-dark font-semibold text-sm leading-[1.14]">
            {title}
          </span>
        </p>
        <div className="flex-shrink flex gap-2">
          {!read && (
            <span
              className="cursor-pointer"
              onClick={() => {
                markAsRead(id);
              }}
            >
              <Icon
                width={20}
                height={20}
                iconName="Check"
                className="fill-gray-dark hover:fill-black"
              />
            </span>
          )}
          <span className="cursor-pointer" onClick={() => deleteAlert(id)}>
            <Icon
              width={20}
              height={20}
              iconName="Trash"
              className="fill-gray-dark hover:fill-black"
            />
          </span>
        </div>
      </div>
      <p className="text-gray-dark font-normal text-xs leading-[1.33]">
        {description}
      </p>
    </li>
  );
};
