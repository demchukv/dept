export type ServerType = {
  id: number;
  state: 'active' | 'inactive';
  title: string;
  type: 'virtual' | 'dedicated' | 'hosting';
  price: number;
  tariff: number;
  waitOnChange?: boolean;
  waitOnTariff?: number;
  virtual?: VirtualType;
  dedicated?: DedicatedType;
  hosting?: HostingType;
};

export type VirtualType = {
  name: string;
  provider: string;
  ip: string;
  activeTo: string;
  sshKey?: sshKeyType[];
};
export type DedicatedType = {
  name: string;
  provider: string;
  ip: string;
  activeTo: string;
};
export type HostingType = {
  name: string;
  activeTo: string;
  sites: number;
  maxSites: number;
  disk: number;
  maxDisk: number;
  databases: number;
  maxDatabases: number;
};

export type sshKeyType = {
  id: number;
  name: string;
  key: string;
  used: string;
  expired: string;
};
