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
};

type electronicPhoto = {
  id: number;
  imgSrc: string;
};
