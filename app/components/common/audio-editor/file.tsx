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
        'flex flex-shrink-0 w-full items-center justify-center sm:w-auto px-3 py-2 bg-main-color rounded font-semibold cursor-pointer',
        className,
      )}
    >
      {children}
      <input
        type="file"
        key={inputKey}
        onChange={handleChange}
        className="hidden"
        accept="audio/*"
      />
    </label>
  );
}
