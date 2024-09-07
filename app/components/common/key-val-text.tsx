import { cn } from '@/lib/utils';
interface KeyValTextProps {
  k: string;
  val: string;
  icon?: React.ReactNode;
  className?: string;
}
export const KeyValText = ({
  k,
  val,
  icon,
  className = '',
}: KeyValTextProps) => {
  const dataKeyClass =
    'font-normal text-sm leading-main-lh text-gray-dark pr-2';
  const dataValClass = 'font-medium text-sm leading-main-lh text-main-dark';

  return (
    <div className={cn('flex items-center', className)}>
      <span className={dataKeyClass}>{k} </span>
      <span className={dataValClass}>{val}</span>
      {icon && <span className="ml-2">{icon}</span>}
    </div>
  );
};
