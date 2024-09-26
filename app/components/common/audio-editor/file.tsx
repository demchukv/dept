import clsx from 'clsx';
import React, { PropsWithChildren, useState } from 'react';

interface FilePickerProps {
  className?: string;
  onPick(file?: File): void;
}

export default function FilePicker({
  onPick,
  className,
  children,
}: PropsWithChildren<FilePickerProps>) {
  const [inputKey, setInputKey] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onPick(e.currentTarget?.files?.[0]);
    setInputKey(inputKey + 1);
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      className={clsx(
        'flex flex-shrink-0 w-full sm:w-auto px-3 py-2 text-white bg-main-color rounded text-xs font-semibold cursor-pointer',
        className,
      )}
    >
      {children}
      <input
        type="file"
        key={inputKey}
        onChange={handleChange}
        className="hidden"
      />
    </label>
  );
}
