import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';

import { getAllFlags } from '@/action/get-flags';
import { FlagType } from '@/types/call';
import { Loading } from '../../common/loading';

interface FlagListProps {
  currentValue: string;
  onChange: (value: string) => void;
}
export const CountryList = ({ currentValue, onChange }: FlagListProps) => {
  const [openList, setOpenList] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<FlagType[]>([]);

  const getFlags = async () => {
    startTransition(async () => {
      const data = await getAllFlags();
      setFlags(data);
    });
  };

  useEffect(() => {
    getFlags();
  }, []);

  function getPhoneCode(iso2: string | undefined) {
    if (iso2) {
      return flags.find((flag) => flag.iso2 === iso2)?.phoneCode || '';
    }
    return '';
  }

  function getIso2ByPhoneCode(phoneCode: string | undefined) {
    if (phoneCode) {
      return flags.find((flag) => flag.phoneCode === phoneCode)?.iso2 || '';
    }
    return '';
  }
  return (
    <>
      {isPending && <Loading className="w-6 h-6" />}
      {!isPending && flags && flags.length > 0 && (
        <Select
          key="flag-select"
          onValueChange={(value) => {
            onChange(getPhoneCode(value));
          }}
          defaultValue={getIso2ByPhoneCode(currentValue)}
          onOpenChange={(value) => setOpenList(value)}
        >
          <SelectTrigger className="w-min border-0 bg-transparent outline-none shadow-none focus:ring-0">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {flags.map((flag) => (
              <SelectItem key={`flag-${flag.iso3}`} value={flag.iso2}>
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
          </SelectContent>
        </Select>
      )}
    </>
  );
};
