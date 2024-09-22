export type PhoneNumbers = {
  id: number;
  number: string;
  numberType: string;
  operator: string;
  operatorIcon: string;
  country: string;
  priceForMonth: number;
  priceForMinute: number;
  activeTo: string;
  inTransfer?: boolean;
};

export type FlagType = {
  flag: string;
  iso2: string;
  iso3: string;
  name: string;
  phoneCode?: string;
  priceForMonth?: number;
  priceForContract?: number;
};
