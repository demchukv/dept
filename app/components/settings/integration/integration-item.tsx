import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import Image from 'next/image';
import React from 'react';

interface IntegrationItemProps {
  item: any;
}
export const IntegrationItem = ({ item }: IntegrationItemProps) => {
  return (
    <Button
      type="button"
      variant="ghost"
      className="border border-gray-light rounded p-2 items-center relative"
    >
      <Image
        src={`/img/logos/${item.logo}`}
        width={100}
        height={57}
        alt={item.name}
      />
      {item.state === 'active' && (
        <>
          <span className="border-l border-gray-medium ml-2 pl-2 pr-5 h-full flex items-center">
            <Icon
              iconName="EditIcon"
              width={20}
              height={20}
              className="fill-gray-medium"
            />
          </span>
          <span className="mr-[-24px] flex items-center justify-center bg-green-additional-color w-8 h-8 rounded-full">
            <Icon
              iconName="CheckIcon"
              width={24}
              height={24}
              className="fill-white"
            />
          </span>
        </>
      )}
    </Button>
  );
};
