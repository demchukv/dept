import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';
import React from 'react';

interface LineFormProps {
  line: any;
  title: string;
  setTitle: any;
  editTitle: boolean;
  setEditTitle: any;
}
export const LineFormHeadExists = ({
  line,
  title,
  setTitle,
  editTitle,
  setEditTitle,
}: LineFormProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-8 sm:items-center">
      <div className="font-semibold text-base leading-normal whitespace-nowrap">
        {line.lineNumber} - {line.lineUser}
      </div>
      <div className="">
        Сценарій:{' '}
        {line.scenarios.length === 0 ? 'немає' : ' індивідуальний номер'}
      </div>
      <div className="flex gap-8 justify-between items-center">
        <div className="">
          {line.groups.length === 0
            ? 'Не використовується в групах'
            : `Група: ${line.groups[0].groupNumber} ${line.groups[0].name}`}
        </div>
        <div>
          {line.state === 'online' ? (
            <span className="font-semibold text-green-additional-color">
              Активний
            </span>
          ) : (
            <span className="font-semibold text-gray-medium">Офлайн</span>
          )}
        </div>
      </div>
    </div>
  );
};
