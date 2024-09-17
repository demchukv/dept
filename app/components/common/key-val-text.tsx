import { cn } from '@/lib/utils';
import React from 'react';
interface KeyValTextProps {
  k: string | React.ReactNode;
  val: string | React.ReactNode;
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
    'font-normal text-sm leading-main-lh text-gray-dark pr-2 flex-grow';
  const dataValClass = 'font-medium text-sm leading-main-lh text-main-dark';

  return (
    <div className={cn('flex items-center flex-start', className)}>
      <span className={dataKeyClass}>{k} </span>
      <span className={dataValClass}>{val}</span>
      {icon && <span className="ml-2 flex-shrink-0">{icon}</span>}
    </div>
  );
};
