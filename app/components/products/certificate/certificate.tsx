import { certificateType } from '@/types/certificate';
import { CertificateInfo } from '@/app/components/products/certificate/certificate-info';

const data: certificateType[] = [
  {
    id: 1,
    publisher: 'Sectigo SSL (OV)',
    domain: 'mydomain.com',
    cert: 'Sectigo SSL (OV)',
    certBody: 'string;',
    price: 500,
    activated: '01.01.2024',
    activeTo: '01.01.2025',
    autoContinue: false,
    csr: "'string;'",
    privateKey: 'string;',
  },
  {
    id: 2,
    publisher: 'Lets Encrypt SSL (OV)',
    domain: 'mydomain.com',
    cert: 'Lets Encrypt SSL (OV)',
    certBody: 'string;',
    price: 'Безкоштовно',
    activated: '01.07.2024',
    activeTo: '01.10.2024',
    autoContinue: true,
    csr: 'string;',
    privateKey: 'string;',
  },
  {
    id: 3,
    publisher: 'Sectigo SSL (OV)',
    domain: 'mydomain.com',
    cert: 'Sectigo SSL (OV)',
    certBody: 'string;',
    price: 500,
    activated: '01.01.2024',
    activeTo: '01.01.2025',
    autoContinue: false,
    csr: 'string;',
    privateKey: 'string;',
  },
];
export const Certificate = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Мої продукти. SSL-Сертифікати
      </h1>
      {data &&
        Array.isArray(data) &&
        data.map((item) => <CertificateInfo key={item.id} data={item} />)}
    </>
  );
};
