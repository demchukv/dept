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
import { CaptionLayout, SelectSingleEventHandler } from 'react-day-picker';

interface DatePickerProps {
  selected: Date;
  onSelect: (date: Date) => void;
  disabled?: (date: Date) => boolean;
  captionLayout?: string | undefined;
  fromYear?: number;
  toYear?: number;
}
export function DatePicker({
  selected,
  onSelect,
  disabled,
  captionLayout = '',
  fromYear = 1900,
  toYear = new Date().getFullYear(),
}: DatePickerProps) {
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
            'w-full justify-between py-2.5 px-2 xs:px-4 lg:py-2 text-left font-medium text-sm xs:text-base text-main-dark leading-[1.37] border border-gray-light bg-bg-color',
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
      <PopoverContent
        className="w-auto p-0 border-0 border-none shadow-none"
        align="start"
      >
        <Calendar
          captionLayout={
            captionLayout ? (captionLayout as CaptionLayout) : undefined
          }
          fromYear={fromYear ? 2020 : undefined}
          toYear={toYear ? 2024 : undefined}
          mode="single"
          selected={selected}
          onSelect={handleOnSelect}
          initialFocus
          disabled={
            disabled
              ? disabled
              : (date) => date > new Date() || date < new Date('2024-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  );
}
