import { Input } from '@/components/ui/input';
import React from 'react';

interface LineFormProps {
  line: any;
  title: string;
  setTitle: any;
  editTitle: boolean;
}
export const LineFormHeadNew = ({
  line,
  title,
  setTitle,
  editTitle,
}: LineFormProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-8 sm:items-center">
      <div className="font-semibold text-base leading-normal whitespace-nowrap">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва лінії"
        />
      </div>
      <div className="">Сценарій: немає</div>
      <div className="flex gap-8 justify-between items-center">
        <div className="">Не використовується в групах</div>
        <div></div>
      </div>
    </div>
  );
};
