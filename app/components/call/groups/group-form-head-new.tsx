import { Input } from '@/components/ui/input';
import React from 'react';

interface GroupFormProps {
  title: string;
  setTitle: any;
  editTitle: boolean;
  lines: any;
}
export const GroupFormHeadNew = ({
  title,
  setTitle,
  lines,
}: GroupFormProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8 sm:items-center">
      <div className="font-semibold text-base leading-normal whitespace-nowrap">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва групи"
        />
      </div>
      <div className="w-full grid grid-cols-2 grid-rows-2 sm:grid-cols-[auto_auto_auto] sm:grid-rows-1 gap-2">
        <div className="order-1 text-right">Ліній: {lines.length}</div>
        <div className="col-span-2 sm:col-span-1">
          Не використовується в сценарії
        </div>
        <div>ID групи: -</div>
      </div>
    </div>
  );
};
