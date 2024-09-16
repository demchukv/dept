import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';

export const Warning = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'flex items-start gap-2 font-normal text-xs text-gray-dark leading-[1.33] mt-3',
        className,
      )}
    >
      <Icon
        iconName="Warning"
        width={20}
        height={20}
        className="fill-warning flex-shrink-0"
      />
      <div>{children}</div>
    </div>
  );
};
