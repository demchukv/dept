export type subscriptionType = {
  id: number;
  type: string;
  title: string;
  price: number;
  startFrom: string;
  activeTo: string;
  state: 'active' | 'inactive';
};
