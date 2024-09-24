import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { DatePicker } from '@/app/components/common/date-picker';
import { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type filtersType = {
  id: string;
  name: string;
}[];

interface SmsListFiltersProps {
  filters: filtersType;
  setFilters: (filters: filtersType) => void;
}
export const SmsListFilters = ({
  filters,
  setFilters,
}: SmsListFiltersProps) => {
  const [startDate, setStartDate] = useState(new Date(filters[0].name));
  const [endDate, setEndDate] = useState(new Date(filters[1].name));
  const [period, setPeriod] = useState('');
  const [open, setOpen] = useState(false);

  const onPeriodChange = (period: string) => {
    if (period !== '') {
      setEndDate(new Date());
    }
    if (period === 'today') {
      setStartDate(new Date());
    }
    if (period === 'week') {
      setStartDate(new Date(new Date().setDate(new Date().getDate() - 7)));
    }
    if (period === 'month') {
      setStartDate(new Date(new Date().setDate(new Date().getDate() - 30)));
    }
    if (period === 'quarter') {
      setStartDate(new Date(new Date().setDate(new Date().getDate() - 90)));
    }
    if (period === 'year') {
      setStartDate(new Date(new Date().setDate(new Date().getDate() - 365)));
    }
    setPeriod(period);
  };

  useEffect(() => {
    setFilters([
      { id: 'startDate', name: startDate.toDateString() },
      { id: 'endDate', name: endDate.toDateString() },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <>
      <div className="w-full flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-5">
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-2 items-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onPeriodChange('today')}
              className={cn(period === 'today' && 'text-main-color')}
            >
              сьогодні
            </Button>
            <span className="text-gray-light">|</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onPeriodChange('week')}
              className={cn(period === 'week' && 'text-main-color')}
            >
              тиждень
            </Button>
            <span className="text-gray-light">|</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onPeriodChange('month')}
              className={cn(period === 'month' && 'text-main-color')}
            >
              місяць
            </Button>
            <span className="text-gray-light">|</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onPeriodChange('quarter')}
              className={cn(period === 'quarter' && 'text-main-color')}
            >
              квартал
            </Button>
            <span className="text-gray-light">|</span>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onPeriodChange('year')}
              className={cn(period === 'year' && 'text-main-color')}
            >
              рік
            </Button>
          </div>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center w-full">
              <div className="flex-grow w-full">
                <DatePicker
                  selected={startDate}
                  onSelect={(value: Date) => {
                    setPeriod('');
                    setStartDate(value);
                  }}
                />
              </div>
              <div className="hidden sm:block flex-shrink-0">–</div>
              <div className="flex-grow w-full">
                <DatePicker
                  selected={endDate}
                  onSelect={(value: Date) => {
                    setPeriod('');
                    setEndDate(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4 sm:mb-0">
          <Button
            type="button"
            variant="ghost"
            className="sm:hidden text-main-color w-6 h-6"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Icon iconName="FilterIcon" width={24} height={24} />
          </Button>

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

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader className="mb-6">
            <ModalTitle></ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner>
            <p className="font-semibold text-base">Показати повідомлення:</p>
            <Separator className="my-4" />
            <div className="sm:hidden flex flex-col gap-4 items-start">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  onPeriodChange('today');
                }}
                className={cn(period === 'today' && 'text-main-color')}
              >
                сьогодні
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  onPeriodChange('week');
                }}
                className={cn(period === 'week' && 'text-main-color')}
              >
                тиждень
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  onPeriodChange('month');
                }}
                className={cn(period === 'month' && 'text-main-color')}
              >
                місяць
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  onPeriodChange('quarter');
                }}
                className={cn(period === 'quarter' && 'text-main-color')}
              >
                квартал
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setOpen(false);
                  onPeriodChange('year');
                }}
                className={cn(period === 'year' && 'text-main-color')}
              >
                рік
              </Button>
            </div>
          </ModalInner>
          <ModalFooter>
            <div className="w-full flex flex-col sm:flex-row-reverse gap-3">
              <Button type="button" variant="default">
                Застосувати
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Відмінити
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
