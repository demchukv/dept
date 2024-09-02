import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-main-color text-white rounded-[4px] pt-3 pb-[13px] px-5 font-bold text-sm border border-main-color hover:shadow-md disabled:border-gray-medium disabled:text-gray-medium disabled:bg-white',
        destructive: 'bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90',
        outline:
          'bg-white border border-main-color rounded-[4px] pt-3 pb-[13px] px-5 text-main-color font-bold text-sm hover:shadow-md disabled:border-gray-medium disabled:text-gray-medium',
        secondary:
          'bg-main-dark pt-3 px-5 pb-[13px] text-white hover:shadow-sm font-bold text-base leading-normal gap-1 items-center',
        ghost: 'hover:text-main-dark ',
        link: 'text-slate-900 underline-offset-4 hover:underline',
        hidden: 'focus-visible:outline-none',
        pagination: 'font-medium text-sm text-main-dark leading-main-lh',
        paginationActive:
          'font-medium text-sm text-white leading-main-lh bg-main-color cursor-default',
      },
      size: {
        default: '' /*padding: 12px 20px 13px 20px;*/,
        sm: 'pt-[10px] pb-[11px] px-[15px] text-xs',
        md: 'pt-[11px] pb-3 px-5 text-xs',
        lg: 'pt-[15px] pb-4 px-6',
        icon: 'h-10 w-10',
        pagination: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
