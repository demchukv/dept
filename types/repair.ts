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
  costParts?: string | number;
  costWork?: string | number;
  complect?: Array<string>;
  defect?: string;
};
