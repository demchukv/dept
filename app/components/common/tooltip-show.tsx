import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TooltipShowProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  sideOffset?: number;
}
export const TooltipShow = ({
  children,
  content,
  className,
  sideOffset = 5,
  ...props
}: TooltipShowProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-50 overflow-hidden rounded bg-white px-2 py-3 font-normal leading-[1.33] text-xs text-main-dark shadow-[0_0_30px_0_rgba(73,96,104,0.16)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
            sideOffset={sideOffset}
            {...props}
          >
            {content}
            <Tooltip.Arrow className="fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
