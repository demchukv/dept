import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn('w-full bg-white rounded-[6px] p-4', className)}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div
      className={cn(
        'flex justify-between items-center gap-1 py-2 text-main-dark font-semibold text-base leading-[1.25]',
        className,
      )}
    >
      {children}
    </div>
  );
};
