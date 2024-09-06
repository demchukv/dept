import { CardHeader } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { KeyValText } from '@/app/components/common/key-val-text';
import { useState } from 'react';
import { EditUserForm } from './edit-user-form';

interface UserFullInfoProps {
  addrData: {
    billing: {
      addr: string;
      id: number;
    }[];
    delivery: {
      addr: string;
      id: number;
    }[];
    recipients: {
      name: string;
      id: number;
    }[];
  };
  userData: {
    name: string;
    email: string;
    phone: string;
    id: number;
  };
}
export const UserFullInfo = ({ addrData, userData }: UserFullInfoProps) => {
  const [view, setView] = useState('data');

  return (
    <>
      <CardHeader className="border-b border-gray-light pb-4 mb-4">
        Інформація про користувача
        <Button
          type="button"
          onClick={() => setView(view === 'data' ? 'edit' : 'data')}
        >
          Редагувати дані
        </Button>
      </CardHeader>
      {view === 'data' && (
        <>
          <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
            Білінг адреси:
          </p>
          <div className="mb-6 space-y-2">
            {addrData.billing.map((item, i) => (
              <KeyValText
                key={item.id}
                k={`Адреса ${i + 1}: `}
                val={item.addr}
              />
            ))}
          </div>

          <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
            Адреси доставки:
          </p>
          <div className="mb-6 space-y-2">
            {addrData.delivery.map((item, i) => (
              <KeyValText
                key={item.id}
                k={`Адреса ${i + 1}: `}
                val={item.addr}
              />
            ))}
          </div>

          <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
            Отримувачі замовлення:
          </p>
          <div className="space-y-2">
            {addrData.recipients.map((item, i) => (
              <KeyValText
                key={item.id}
                k={`Отримувач ${i + 1}: `}
                val={item.name}
              />
            ))}
          </div>
        </>
      )}
      {view === 'edit' && (
        <EditUserForm userData={userData} addrData={addrData} />
      )}
    </>
  );
};
