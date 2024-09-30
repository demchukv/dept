import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';
import React from 'react';

interface GroupFormProps {
  group: any;
  lines: any;
  title: string;
  setTitle: any;
  editTitle: boolean;
  setEditTitle: any;
}
export const GroupFormHeadExists = ({
  group,
  lines,
  title,
  setTitle,
  editTitle,
  setEditTitle,
}: GroupFormProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
      <div className="font-semibold text-base leading-normal whitespace-nowrap flex items-center gap-2">
        {!editTitle && (
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditTitle(true)}
            >
              <Icon iconName="EditIcon" width={24} height={24} />
            </Button>
            {title}
          </>
        )}
        {editTitle && (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditTitle(false)}
            placeholder="Назва групи"
          />
        )}
      </div>
      <div className="w-full grid grid-cols-2 grid-rows-2 sm:grid-cols-[auto_auto_auto] sm:grid-rows-1 gap-2">
        <div className="order-1 text-right">Ліній: {lines.length}</div>
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
