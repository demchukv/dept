export type subscriptionType = {
  id: number;
  type: string;
  title: string;
  price: number;
  startFrom: string;
  activeTo: string;
  state: 'active' | 'inactive';
  maxDevices?: number;
  devices?: deviceType[];
  softInfo?: softType;
};

export type deviceType = {
  id: number;
  title: string;
  lastActivity: string;
  instruction: string;
};

export type softType = {
  softKey?: string;
  fileSource?: string;
  instruction?: string;
};
