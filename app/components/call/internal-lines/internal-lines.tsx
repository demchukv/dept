'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

export const InternalLines = () => {
  const [addForm, setAddForm] = React.useState(false);
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Телефонія. Внутрішні лінії
        </h1>
        <Button type="button" onClick={() => setAddForm(!addForm)}>
          Створити лінію
        </Button>
      </div>
    </>
  );
};
