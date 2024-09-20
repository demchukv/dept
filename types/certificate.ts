export type certificateType = {
  id: number;
  publisher: string;
  domain: string;
  cert: string;
  certBody: string;
  price: number | string;
  activated: string;
  activeTo: string;
  autoContinue: boolean;
};
