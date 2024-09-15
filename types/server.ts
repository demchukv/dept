export type ServerType = {
  id: number;
  state: 'active' | 'inactive';
  title: string;
  type: 'virtual' | 'dedicated' | 'hosting';

  virtual?: VirtualType;
  dedicated?: DedicatedType;
  hosting?: HostingType;
};

export type VirtualType = {
  name: string;
  provider: string;
  ip: string;
  price: number;
  activeTo: string;
};
export type DedicatedType = {
  name: string;
  provider: string;
  ip: string;
  price: number;
  activeTo: string;
};
export type HostingType = {
  name: string;
  price: number;
  activeTo: string;
  sites: number;
  disk: number;
  databases: number;
};
