import React from 'react';
import { electronicType } from '@/types/electronic';
import { Button } from '@/components/ui/button';
import { ElectronicInfoPhoto } from '@/app/components/electronic/electronic-info-photo';

interface CredentialsProps {
  data: electronicType;
}
export const Credentials = ({ data }: CredentialsProps) => {
  return (
    <>
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:gap-4 md:gap-16 mb-8">
        <div>
          <ElectronicInfoPhoto data={data} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <p className="font-semibold leading-main-lh">Характеристики</p>
          </div>
          <div>
            <p className="font-semibold leading-main-lh">Комплектність</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 sm:flex-row sm:gap-4 md:gap-16">
        <div className="w-full hidden sm:block">
          <p className="leading-main-lh">В користуванні з {data.fromDate}</p>
        </div>
        <div className="w-full text-center sm:text-right">
          <Button
            variant="ghost"
            className="px-0 text-warning font-semibold leading-main-lh"
          >
            Повернути пристрій
          </Button>
        </div>
      </div>
    </>
  );
};
