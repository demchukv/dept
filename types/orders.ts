export type orderDocType = {
  docId: number;
  id: number;
  name: string;
  info: string;
  file: string;
};

export type operationType = {
  id: number;
  date: string;
  name: string;
  amount: number;
  type: string;
  file?: string;
};

export type billsType = {
  id: number;
  date: string;
  number: string;
  amount: number;
  file?: string;
};

export type companyDocType = {
  number: string;
  id: number;
  name: string;
  date: string;
  file: string;
};
