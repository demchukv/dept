export type accoutTypeT = {
  id: number;
  account: 'company' | 'user';
  name: string;
  balance: number;
};

export type userInfoType = {
  contract: number;
  name: string;
  email: string;
  phone: string;
  edrpou: number;
  balance: number;
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
export type certificateType = {
  id: number;
  cert: string;
  price: number | string;
  activeTo: string;
};

export type serverType = {
  id: number;
  brand: string;
  name: string;
  price: number;
  activeTo: string;
};
