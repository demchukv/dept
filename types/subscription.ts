export type subscriptionType = {
  id: number;
  type: string;
  title: string;
  price: number;
  startFrom: string;
  activeTo: string;
  state: 'active' | 'inactive';
  devices?: deviceType[];
  softs?: softType[];
};

type deviceType = {
  id: number;
  title: string;
  lastActivity: string;
  instruction: string;
};

type softType = {
  id: number;
  title: string;
  softKey: string;
  fileSource: string;
  instruction: string;
};
