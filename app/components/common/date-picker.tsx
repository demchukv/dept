'use client';

import * as React from 'react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SelectSingleEventHandler } from 'react-day-picker';

interface DatePickerProps {
  selected: Date;
  onSelect: (date: Date) => void;
}
export function DatePicker({ selected, onSelect }: DatePickerProps) {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const handleOnSelect: SelectSingleEventHandler = (date) => {
    onSelect?.(date as Date);
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'w-full justify-between py-[11px] px-2 xs:px-4 text-left font-medium text-sm xs:text-base text-main-dark leading-[1.37] border border-gray-light bg-bg-color',
            !selected && 'text-gray-light',
          )}
        >
          {selected ? (
            format(selected, 'dd.MM.yyyy')
          ) : (
            <span className="text-xs">дд.мм.рррр</span>
          )}
          <Icon
            width={20}
            height={20}
            iconName="Calendar"
            className="fill-main-color"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          // captionLayout="dropdown-buttons"
          // fromYear={2020}
          // toYear={2024}
          mode="single"
          selected={selected}
          onSelect={handleOnSelect}
          initialFocus
          disabled={(date) =>
            date > new Date() || date < new Date('2024-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  );
}
