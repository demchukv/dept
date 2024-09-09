import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';

interface StatusLabelProps {
  status: string;
  className?: string;
}
export const StatusLabel = ({ status, className }: StatusLabelProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 border rounded py-3 px-5 justify-center',
        'font-bold text-sm',
        statusList[status].bgColor,
        statusList[status].borderColor,
        statusList[status].textColor,
        className,
      )}
    >
      <Icon iconName={statusList[status].icon} width={24} height={24} />
      <span>{statusList[status].name}</span>
    </div>
  );
};

export const statusList: Record<
  string,
  {
    name: string;
    icon: string;
    textColor: string;
    borderColor: string;
    bgColor: string;
  }
> = {
  wait: {
    name: 'Очікує на виконання',
    icon: 'ClockWait',
    textColor: 'text-gray-dark',
    borderColor: 'border-gray-medium',
    bgColor: 'bg-[rgba(79,89,92,0.08)]',
  },
  inwork: {
    name: 'В роботі',
    icon: 'ClockInWork',
    textColor: 'text-main-color',
    borderColor: 'border-main-color',
    bgColor: 'bg-[rgba(18,178,231,0.08)]',
  },
  pause: {
    name: 'На паузі',
    icon: 'ClockPause',
    textColor: 'text-attention',
    borderColor: 'border-attention',
    bgColor: 'bg-[rgba(240,173,78,0.08)]',
  },
  ready: {
    name: 'Завершено',
    icon: 'ClockReady',
    textColor: 'text-green-additional-color',
    borderColor: 'border-green-additional-color',
    bgColor: 'bg-[rgba(92,184,92,0.08)]',
  },
};
