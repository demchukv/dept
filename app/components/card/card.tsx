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
