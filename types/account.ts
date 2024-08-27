export type accoutTypeT = {
  account: 'company' | 'user';
  name: string;
};

export type userInfoType = {
  contract: number;
  name: string;
  email: string;
  phone: string;
  edrpou: number;
};

export type callType = {
  startDate: string;
  endDate: string;
  incoming: string;
  outgoing: string;
  total: number;
};

export type bagType = {
  id: number;
  number: string;
  date: string;
  state: string;
  amount: number;
};
