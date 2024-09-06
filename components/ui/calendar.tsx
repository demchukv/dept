'use client';

import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import {
  DayPicker,
  DropdownProps,
  useDayPicker,
  useNavigation,
} from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { i18nConfig, LOCALES } from '@/i18nConfig';

import * as dateFnsLocales from 'date-fns/locale';
import { format, setMonth } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || i18nConfig.defaultLocale;

  const localeData = Object.values(LOCALES).find(
    (locale) => locale.code === lang,
  );

  const currentLocale =
    dateFnsLocales[localeData?.dfLocale as keyof typeof dateFnsLocales] ||
    dateFnsLocales.enUS;

  return (
    <DayPicker
      locale={currentLocale}
      showOutsideDays={showOutsideDays}
      className={cn(
        'p-3 border-none rounded-xl bg-white shadow-[0_0_2px_0_rgba(0,0,0,0.12),0_8px_16px_0_rgba(0,0,0,0.14)]',
        className,
      )}
      classNames={{
        months:
          'flex flex-col text-main-dark text-base sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-base font-medium',
        nav: 'space-x-1 flex items-center ',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-full',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse  space-y-1 ',
        head_row: 'flex border-b border-gray-light ',
        head_cell:
          'text-gray-dark text-xs rounded-md w-8 font-normal text-[0.8rem] ',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-bg-color [&:has([aria-selected].day-outside)]:bg-bg-color/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'text-white bg-main-color rounded-full',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-bg-color/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-bg-color aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        caption_dropdowns: 'flex gap-1',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
        Dropdown: (props: DropdownProps) => {
          const {
            fromDate,
            fromMonth,
            fromYear,
            toDate,
            toMonth,
            toYear,
            selected,
          } = useDayPicker();
          const { goToMonth, currentMonth } = useNavigation();
          let current = currentMonth;
          if (selected instanceof Date) {
            current = selected;
          }
          if (props.name === 'months') {
            const selectItems = Array.from({ length: 12 }, (_, i) => {
              return {
                value: i.toString(),
                label: format(setMonth(new Date(), i), 'MMM', {
                  locale: currentLocale,
                }),
              };
            });
            return (
              <Select
                onValueChange={(newValue) => {
                  const newDate = new Date(currentMonth);
                  newDate.setMonth(parseInt(newValue));
                  goToMonth(newDate);
                }}
                // value={current.getMonth().toString()}
              >
                <SelectTrigger>
                  {format(currentMonth, 'MMM', { locale: currentLocale })}
                  {/* <SelectValue placeholder="" /> */}
                </SelectTrigger>
                <SelectContent>
                  {selectItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          } else if (props.name === 'years') {
            const earliestYear =
              fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear();
            const latestYear =
              toYear || toMonth?.getFullYear() || toDate?.getFullYear();
            let selectItems: { label: string; value: string }[] = [];
            if (earliestYear && latestYear) {
              const yearsLength = latestYear - earliestYear + 1;
              selectItems = Array.from({ length: yearsLength }, (_, i) => ({
                label: (earliestYear + i).toString(),
                value: (earliestYear + i).toString(),
              }));
            }
            return (
              <Select
                onValueChange={(newValue) => {
                  const newDate = new Date(currentMonth);
                  newDate.setFullYear(parseInt(newValue));
                  goToMonth(newDate);
                }}
                value={props?.value?.toString()}
                // value={current.getFullYear().toString()}
              >
                <SelectTrigger>
                  {currentMonth.getFullYear()}
                  {/* <SelectValue placeholder="" /> */}
                </SelectTrigger>
                <SelectContent>
                  {selectItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }
          return null;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
