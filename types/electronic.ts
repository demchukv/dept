export type electronicType = {
  id: number;
  category: string;
  brand: string;
  title: string;
  user: string;
  department: string;
  cost: string | number;
  fromDate?: string;
  toDate?: string;
  progress?: number;
  progressTitle?: string;
  serial: string;
  description?: string;
  photoList?: electronicPhoto[];
  complect?: Array<string>;
  characteristics?: electronicCharacteristic[];
};

export type electronicPhoto = {
  id: number;
  imgSrc: string;
};

export type electronicCharacteristic = {
  label: string;
  value: string;
};
