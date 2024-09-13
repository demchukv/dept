import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';

interface RepairStatusLabelProps {
  status: string;
  className?: string;
}
export const RepairStatusLabel = ({
  status,
  className,
}: RepairStatusLabelProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 border rounded py-3 px-5 justify-center',
        'font-bold text-sm',
        repairStatusList[status].bgColor,
        repairStatusList[status].borderColor,
        repairStatusList[status].textColor,
        className,
      )}
    >
      <Icon iconName={repairStatusList[status].icon} width={24} height={24} />
      <span>{repairStatusList[status].name}</span>
    </div>
  );
};

export const RepairStatusLabelText = ({
  status,
  className,
}: RepairStatusLabelProps) => {
  return (
    <span
      className={cn(
        'font-semibold text-sm',
        repairStatusList[status].textColor,
        className,
      )}
    >
      {repairStatusList[status].name}
    </span>
  );
};

export const repairStatusList: Record<
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
    name: 'Очікуємо пристрій',
    icon: 'ClockWait',
    textColor: 'text-gray-dark',
    borderColor: 'border-gray-medium',
    bgColor: 'bg-[rgba(79,89,92,0.08)]',
  },
  diagnose: {
    name: 'Діагностуємо',
    icon: 'ClockInWork',
    textColor: 'text-orange-additional-color',
    borderColor: 'border-orange-additional-color',
    bgColor: 'bg-[rgba(237,103,60,0.08)]',
  },
  orderparts: {
    name: 'Замовлені комплектуючі',
    icon: 'ClockPause',
    textColor: 'text-attention',
    borderColor: 'border-attention',
    bgColor: 'bg-[rgba(240,173,78,0.08)]',
  },
  inwork: {
    name: 'Проводимо ремонт',
    icon: 'StatusRepair',
    textColor: 'text-blue-additional-color',
    borderColor: 'border-blue-additional-color',
    bgColor: 'bg-[rgba(91,192,222,0.08)]',
  },
  check: {
    name: 'Перевірка',
    icon: 'StatusCheck',
    textColor: 'text-main-green',
    borderColor: 'border-main-green',
    bgColor: 'bg-[rgba(0,174,160,0.08)]',
  },
  send: {
    name: 'Відправлено',
    icon: 'StatusSend',
    textColor: 'text-warning',
    borderColor: 'border-warning',
    bgColor: 'bg-[rgba(232,51,51,0.08)]',
  },
  ready: {
    name: 'Ремонт завершено',
    icon: 'StatusReady',
    textColor: 'text-green-additional-color',
    borderColor: 'border-green-additional-color',
    bgColor: 'bg-[rgba(92,184,92,0.08)]',
  },
};
