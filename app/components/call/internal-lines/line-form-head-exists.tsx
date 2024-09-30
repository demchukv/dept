import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';
import React from 'react';

interface LineFormProps {
  line: any;
  lines: any;
  title: string;
  setTitle: any;
  editTitle: boolean;
  setEditTitle: any;
}
export const LineFormHeadExists = ({
  line,
  lines,
  title,
  setTitle,
  editTitle,
  setEditTitle,
}: LineFormProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-8 sm:items-center">
      <div className="font-semibold text-base leading-normal whitespace-nowrap">
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
            placeholder="Назва лінії"
          />
        )}
      </div>
      <div className="">Сценарій: немає</div>
      <div className="flex gap-8 justify-between items-center">
        <div className="">Не використовується в групах</div>
        <div>{lines.state === 'online' ? 'online' : 'offline'}</div>
      </div>
    </div>
  );
};
