import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { DatePicker } from '@/app/components/common/date-picker';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';

type filtersType = {
  id: string;
  name: string;
}[];

interface SmsListFiltersProps {
  filters: filtersType;
  setFilters: (filters: filtersType) => void;
  directions: filtersType;
  innerLines: filtersType;
}
export const HistoryFilters = ({
  filters,
  setFilters,
  directions,
  innerLines,
}: SmsListFiltersProps) => {
  const [startDate, setStartDate] = useState(new Date(filters[0].name));
  const [endDate, setEndDate] = useState(new Date(filters[1].name));
  const [direction, setDirection] = useState('all');
  const [line, setLine] = useState('0');

  useEffect(() => {
    setFilters([
      { id: 'startDate', name: startDate.toDateString() },
      { id: 'endDate', name: endDate.toDateString() },
      { id: 'direction', name: direction },
      { id: 'line', name: line },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, direction, line]);

  return (
    <>
      <div className="w-full flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
          <div className="w-full">
            <p className="text-xs text-gray-dark mb-1">Напрямок</p>
            <Select onValueChange={(value) => setDirection(value)}>
              <SelectTrigger name="from" value={direction} className="w-full">
                <SelectValue placeholder="Всі напрямки" />
              </SelectTrigger>
              <SelectContent>
                {directions.map((direction) => (
                  <SelectItem key={direction.id} value={direction.id}>
                    {direction.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-grow w-full">
            <p className="text-xs text-gray-dark mb-1">З дати</p>
            <DatePicker
              selected={startDate}
              onSelect={(value: Date) => {
                setStartDate(value);
              }}
            />
          </div>
          <div className="flex-grow w-full">
            <p className="text-xs text-gray-dark mb-1">По дату</p>
            <DatePicker
              selected={endDate}
              onSelect={(value: Date) => {
                setEndDate(value);
              }}
            />
          </div>
          <div className="w-full">
            <p className="text-xs text-gray-dark mb-1">Внутрішня лінія</p>
            <Select onValueChange={(value) => setLine(value)}>
              <SelectTrigger name="from" value={line} className="w-full">
                <SelectValue placeholder="Всі лінії" />
              </SelectTrigger>
              <SelectContent>
                {innerLines.map((line) => (
                  <SelectItem key={line.id} value={line.id}>
                    {line.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center justify-end mb-4 sm:mb-0">
          <Link
            href="#"
            download
            className="font-semibold text-sm text-main-color hover:text-main-dark leading-main-lh flex items-center gap-1.5"
          >
            Завантажити в Excel
            <Icon
              iconName="Doc"
              width={16}
              height={16}
              className="w-4 h-4 flex-shrink-0"
            />
          </Link>
        </div>
      </div>
    </>
  );
};
