import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';

interface RepairStatusLabelProps {
  status: string;
  className?: string;
}
export const SmsStatusLabel = ({
  status,
  className,
}: RepairStatusLabelProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 pt-0.5 justify-start',
        'font-semibold text-sm',
        SmsStatusList[status].textColor,
        className,
      )}
    >
      <Icon
        iconName={SmsStatusList[status].icon}
        width={20}
        height={20}
        className={cn('w-5 h-5', SmsStatusList[status].iconColor)}
      />
      <span>{SmsStatusList[status].name}</span>
    </div>
  );
};

export const SmsStatusList: Record<
  string,
  {
    name: string;
    icon: string;
    iconColor: string;
    textColor: string;
  }
> = {
  ok: {
    name: 'Доставлено',
    icon: 'CheckIcon',
    iconColor: 'fill-green-additional-color',
    textColor: 'text-gray-dark',
  },
  badnumber: {
    name: 'Невірний номер',
    icon: 'DangerHexagon',
    iconColor: 'fill-warning',
    textColor: 'text-warning',
  },
  notdelivered: {
    name: 'Не доставлено',
    icon: 'DangerTriangle',
    iconColor: 'fill-attention',
    textColor: 'text-attention',
  },
  error: {
    name: 'Помилка',
    icon: 'StatusRepair',
    iconColor: 'fill-blue-additional-color',
    textColor: 'text-blue-additional-color',
  },
  waiting: {
    name: 'В процесі',
    icon: 'StatusCheck',
    iconColor: 'fill-main-green',
    textColor: 'text-main-green',
  },
};
