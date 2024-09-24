import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';
import { skip } from 'node:test';

interface RepairStatusLabelProps {
  status: string;
  className?: string;
}
export const CallStatusLabel = ({
  status,
  className,
}: RepairStatusLabelProps) => {
  return (
    <div
      className={cn(
        'font-medium text-sm',
        CallStatusList[status].textColor,
        className,
      )}
    >
      {CallStatusList[status].name}
    </div>
  );
};

export const CallStatusList: Record<
  string,
  {
    name: string;
    textColor: string;
  }
> = {
  ok: {
    name: 'Розмову завершено',
    textColor: 'text-green-additional-color',
  },
  noreply: {
    name: 'Без відповіді',
    textColor: 'text-gray-medium',
  },
  skipped: {
    name: 'Пропущений',
    textColor: 'text-warning',
  },
  error: {
    name: 'Помилка',
    textColor: 'text-blue-additional-color',
  },
  waiting: {
    name: 'В процесі',
    textColor: 'text-main-green',
  },
};
