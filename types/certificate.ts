export type certificateType = {
  id: number;
  publisher: string;
  domain: string;
  cert: string;
  certBody: string;
  price: number | string;
  activated: string;
  activeTo: string;
  autoContinue: boolean;
  csr: string;
  privateKey: string;
  pib: string;
  phone: string;
  city: string;
  email: string;
};
