import { useState } from 'react';
import { KeyValText } from '../common/key-val-text';
import { EditCompanyForm } from './edit-company-form';
import { CardHeader } from '../card/card';
import { Button } from '@/components/ui/button';

interface CompanyFullInfoProps {
  companyData: {
    id: number;
    name: string;
    email: string;
    phone: string;
    edrpou: string;
    contract: string;
    form: string;
    ipn: string;
    bank: string;
    iban: string;
    pib: string;
    doc: string;
    addr: string;
  };
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
  view: 'data' | 'edit';
  setView: (view: 'data' | 'edit') => void;
}
export const CompanyFullInfo = ({
  companyData,
  addrData,
  view,
  setView,
}: CompanyFullInfoProps) => {
  // const [view, setView] = useState('data');
  return (
    <>
      {view === 'data' && (
        <>
          <CardHeader className="border-b border-gray-light pb-4 mb-4">
            Інформація про компанію
            <Button
              type="button"
              onClick={() => setView(view === 'data' ? 'edit' : 'data')}
            >
              Редагувати дані
            </Button>
          </CardHeader>
          <p className="font-medium text-sm leading-main-lh text-main-dark mb-3">
            Реквізити:
          </p>
          <KeyValText
            className="mb-4"
            k="Форма реєстрації компанії:"
            val={companyData.email}
          />
          <KeyValText className="mb-4" k="ЄДРПОУ:" val={companyData.edrpou} />
          <KeyValText className="mb-4" k="ІПН:" val={companyData.ipn} />
          <KeyValText className="mb-4" k="Банк:" val={companyData.bank} />
          <KeyValText
            className="mb-4"
            k="Рахунок IBAN:"
            val={companyData.iban}
          />
          <KeyValText
            className="mb-4"
            k="ПІБ керівника:"
            val={companyData.pib}
          />
          <KeyValText
            className="mb-4"
            k="Документ на основі якого діє:"
            val={companyData.doc}
          />
          <KeyValText
            className="mb-4"
            k="Юридична адреса:"
            val={companyData.addr}
          />
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
        <EditCompanyForm
          companyData={companyData}
          addrData={addrData}
          view={view}
          setView={setView}
        />
      )}
    </>
  );
};
