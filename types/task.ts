export type taskType = {
  id: number;
  title: string;
  number: string;
  createdAt: string;
  deadline: string;
  status: 'wait' | 'inwork' | 'pause' | 'ready';
  responsible: string;
  sheduledTime: string;
  spentTime: string;
  cost: string | number;
  source: string;
  author: string;
  subRows?: taskType[];
};
