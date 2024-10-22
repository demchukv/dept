import React from 'react';
import { electronicType, electronicCharacteristic } from '@/types/electronic';
import { Button } from '@/components/ui/button';
import { ElectronicInfoPhoto } from '@/app/components/electronic/electronic-info-photo';
import { KeyValText } from '../common/key-val-text';

interface CredentialsProps {
  data: electronicType;
}
export const Credentials = ({ data }: CredentialsProps) => {
  return (
    <>
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:gap-4 md:gap-16 mb-8">
        <div className="sm:max-w-2/3">
          <ElectronicInfoPhoto data={data} />
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div>
            <p className="font-semibold leading-main-lh mb-4">Характеристики</p>
            {data.characteristics && Array.isArray(data.characteristics) && (
              <div className="flex flex-col gap-2">
                {data.characteristics.map(
                  (item: electronicCharacteristic, ind) => (
                    <KeyValText
                      key={ind}
                      k={item.label}
                      val={item.value}
                      className="justify-between"
                      keyClass="font-medium text-xs"
                      valClass="text-right whitespace-nowrap font-bold text-xs"
                    />
                  ),
                )}
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold leading-main-lh mb-4">Комплектність</p>
            {data.complect && Array.isArray(data.complect) && (
              <ul className="flex flex-col gap-2">
                {data.complect.map((item, ind) => (
                  <li key={ind} className="text-xs font-bold">
                    {item}
                  </li>
                ))}
              </ul>
            )}
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
