import React from 'react';

interface GroupFormProps {
  group: any;
  form: any;
}
export const GroupFormHeadExists = ({ group, form }: GroupFormProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="font-semibold text-base leading-normal whitespace-nowrap">
        {group.name}
      </div>
      <div className="w-full grid grid-cols-2 grid-rows-2 sm:grid-cols-[auto_auto_auto] sm:grid-rows-1 gap-2">
        <div className="order-1 text-right">Ліній: {group.lines}</div>
        <div className="col-span-2 sm:col-span-1">
          {group.used
            ? 'Використовується в сценарії'
            : 'Не використовується в сценарії'}
        </div>
        <div>ID групи: {group.groupID}</div>
      </div>
    </div>
  );
};
