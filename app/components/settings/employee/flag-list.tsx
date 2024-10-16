import { FlagType } from '@/types/call';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { current } from '@reduxjs/toolkit';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FlagListProps {
  flags: FlagType[];
  currentValue: string;
  onChange: (value: string) => void;
}
export const FlagList = ({ flags, currentValue, onChange }: FlagListProps) => {
  const [openList, setOpenList] = useState(false);
  return (
    <Select
      onValueChange={(value) => {
        onChange(value);
      }}
      defaultValue={currentValue}
      onOpenChange={(value) => setOpenList(value)}
    >
      <SelectTrigger className="w-min border-0 bg-transparent outline-none shadow-none focus:ring-0">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {flags.map((flag) => (
          <SelectItem key={flag.iso3} value={flag.phoneCode ?? ''}>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 text-center overflow-hidden rounded-full object-cover flex-shrink-0">
                <Image
                  src={flag.flag}
                  alt={flag.name}
                  width={24}
                  height={24}
                  style={{
                    objectFit: 'cover',
                    height: '24px',
                    width: 'auto',
                  }}
                />
              </div>
              <span className={cn(openList ? 'inline' : 'hidden')}>
                {flag.name}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
