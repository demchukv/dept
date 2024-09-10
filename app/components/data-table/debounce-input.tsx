import React from 'react';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  icon,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
  icon?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (icon) {
    return (
      <div className="relative">
        <Input
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Icon
          iconName={icon}
          width={24}
          height={24}
          className="absolute right-3 top-1/2 -translate-y-1/2 fill-main-dark"
        />
      </div>
    );
  }
  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
