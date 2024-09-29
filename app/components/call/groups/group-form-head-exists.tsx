import React from 'react';

interface GroupFormProps {
  group: any;
  form: any;
}
export const GroupFormHeadExists = ({ group, form }: GroupFormProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {' '}
      <div className="font-semibold text-base leading-normal whitespace-nowrap">
        {group.name}
      </div>
      <div>Ліній: {group.lines}</div>
      <div>
        {group.used
          ? 'Використовується в сценарії'
          : 'Не використовується в сценарії'}
      </div>
      <div>ID групи: {group.groupID}</div>
    </div>
  );
};
