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

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            'w-full justify-between py-[11px] px-2 xs:px-4 text-left font-medium text-sm xs:text-base text-main-dark leading-[1.37] border border-gray-light bg-bg-color',
            !date && 'text-gray-light',
          )}
        >
          {date ? (
            format(date, 'dd.MM.yyyy')
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
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
