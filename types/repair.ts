export type repairType = {
  id: number;
  number: string;
  device: string;
  createdAt: string;
  deadline: string;
  action: string;
  status:
    | 'wait'
    | 'diagnose'
    | 'orderparts'
    | 'inwork'
    | 'check'
    | 'send'
    | 'ready';
  client: string;
  cost: string | number;
  payment: string;
  serial?: string;
  inTTN?: string;
  outTTN?: string;
  costParts?: string | number;
  costWork?: string | number;
  complect?: Array<string>;
  defect?: string;
  workList?: repairWork[];
  partsList?: repairParts[];
  photoList?: repairPhoto[];
  progress?: number;
  progressTitle?: string;
};

type repairWork = {
  id: number;
  title: string;
  price: string | number;
  quantity: number;
  date: string;
};

type repairParts = {
  id: number;
  title: string;
  price: string | number;
  quantity: number;
  date: string;
  imgSrc?: string;
};

type repairPhoto = {
  id: number;
  imgSrc: string;
};
