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

interface CardTopAlertProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'attention' | 'success';
}
export const CardTopAlert = ({
  children,
  className,
  variant = 'attention',
}: CardTopAlertProps) => {
  return (
    <div className="w-full flex justify-end rounded-tr-[4px] overflow-hidden">
      <div
        className={cn(
          'w-auto font-bold text-xs leading-[1.17] py-[5px] pl-7 pr-4 text-right',
          variant === 'success' && 'bg-green-additional-color text-white',
          variant === 'attention' &&
            'bg-attention text-white [clip-path:polygon(3.519%_36.516%,3.519%_36.516%,3.924%_29.944%,4.374%_23.948%,4.867%_18.556%,5.398%_13.795%,5.963%_9.693%,6.557%_6.276%,7.177%_3.571%,7.818%_1.605%,8.476%_0.406%,9.147%_0%,97.959%_0%,97.959%_0%,98.29%_0.327%,98.604%_1.275%,98.897%_2.79%,99.165%_4.824%,99.402%_7.322%,99.606%_10.235%,99.772%_13.511%,99.896%_17.098%,99.973%_20.945%,100%_25%,100%_100%,0%_100%,3.519%_36.516%)]',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
// [clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%);]
