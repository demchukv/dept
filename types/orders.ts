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
