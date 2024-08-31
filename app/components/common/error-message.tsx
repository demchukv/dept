import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <div className="p-5 text-red-500 border border-red-500 text-base font-normal">
      {children}
    </div>
  );
};
