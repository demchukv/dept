import { FlagType } from '@/types/call';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
        {flags && flags.length > 0 && (
          <>
            {flags.map((flag) => (
              <SelectItem
                key={`flag-${flag.iso3}`}
                value={flag.phoneCode ?? ''}
              >
                <div key={flag.iso3} className="flex items-center gap-2">
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
          </>
        )}
      </SelectContent>
    </Select>
  );
};
