import { DebouncedInput } from '@/app/components/data-table/debounce-input';
import { Column } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-tab';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import React from 'react';
import {
  AutoComplete,
  type Option,
} from '@/app/components/common/autocomplete';

export const Filter = ({
  column,
  icon,
}: {
  column: Column<any, unknown>;
  icon?: string;
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);
  const [valueAutoComplete, setValueAutoComplete] = useState<Option>();

  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const { selectValues } = column.columnDef.meta ?? {};

  const sortedUniqueValues = React.useMemo(
    () =>
      filterVariant === 'datalist'
        ? Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000)
        : [],
    [column.getFacetedUniqueValues(), filterVariant],
  );

  const sortedUniqueKeyValues = React.useMemo(() => {
    if (filterVariant === 'autocomplete') {
      const list = Array.from(column.getFacetedUniqueValues().keys())
        .sort()
        .slice(0, 5000);
      return list.map((x) => ({ label: x, value: x }));
    }
  }, [column.getFacetedUniqueValues(), filterVariant]);

  const handleChange = (value: Option) => {
    column.setFilterValue(value.value.trim());
    setValueAutoComplete(value);
  };

  return filterVariant === 'range' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : filterVariant === 'select' ? (
    <>
      <Select
        onValueChange={(e) => column.setFilterValue(e.trim())}
        defaultValue={columnFilterValue?.toString()}
      >
        <SelectTrigger className="min-w-[130px] w-full py-[9px] border-gray-light">
          <SelectValue placeholder="Дані пошуку" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" ">Всі статуси</SelectItem>
          {selectValues?.map((val: { label: string; value: string }) => (
            <SelectItem key={val.value} value={val.value}>
              {val.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  ) : filterVariant === 'date' ? (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(' justify-start text-left font-normal')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {columnFilterValue ? (
              format(columnFilterValue as Date, 'dd.MM.yyyy')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={columnFilterValue as Date}
            onSelect={column.setFilterValue}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  ) : filterVariant === 'autocomplete' ? (
    <AutoComplete
      options={sortedUniqueKeyValues as Option[]}
      emptyMessage="Нічого не знайдено"
      placeholder="Дані пошуку"
      isLoading={isLoading}
      onValueChange={(val) => handleChange(val)}
      value={valueAutoComplete}
      disabled={isDisabled}
    />
  ) : filterVariant === 'datalist' ? (
    <>
      {/* Autocomplete suggestions from faceted values feature */}
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        className="min-w-[130px] w-full border rounded py-[7px]"
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        type="text"
        value={(columnFilterValue ?? '') as string}
        icon={icon}
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  ) : (
    <>
      <DebouncedInput
        className="min-w-[130px] w-full border rounded py-[8px]"
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
        icon={icon}
      />
    </>
  );
};
