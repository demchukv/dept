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
};
