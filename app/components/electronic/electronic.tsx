import { Button } from '@/components/ui/button';
import React from 'react';

export const Electronic = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Техніка у використанні
        </h1>
        <Button type="button">Отримати пристрій</Button>
      </div>
    </>
  );
};
