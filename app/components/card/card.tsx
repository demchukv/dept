import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        'w-full bg-white rounded-[6px] p-4 md:pb-7 lg:py-8 lg:px-7',
        className,
      )}
    >
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

export const CardSeparator = () => {
  return <Separator className="my-4 lg:my-5 lg:mb-7" />;
};
