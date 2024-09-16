export type ServerType = {
  id: number;
  state: 'active' | 'inactive';
  title: string;
  type: 'virtual' | 'dedicated' | 'hosting';
  price: number;

  virtual?: VirtualType;
  dedicated?: DedicatedType;
  hosting?: HostingType;
};

export type VirtualType = {
  name: string;
  provider: string;
  ip: string;
  activeTo: string;
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
