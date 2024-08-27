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

export type taskType = {
  id: number;
  date: string;
  title: string;
  state: string;
  amount: number | string;
};

export type repairType = {
  id: number;
  date: string;
  title: string;
  state: string;
  amount: number | string;
};

export type subscriptionType = {
  id: number;
  type: string;
  title: string;
  price: number;
  activeTo: string;
};

export type numbersType = {
  id: number;
  type: string;
  number: string;
  price: number;
  activeTo: string;
};

export type domainType = {
  id: number;
  domain: string;
  price: number;
  activeTo: string;
};
