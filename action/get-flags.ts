import phoneCode from '@/public/test-data/country-phone-code.json';
import { FlagType } from '@/types/call';

type phoneCodeType = {
  [key: string]: string;
};
type Iso2Code = keyof typeof phoneCode;

export const getAllFlags = async () => {
  const response = await fetch(
    'https://countriesnow.space/api/v0.1/countries/flag/images',
  );
  const data = await response.json();
  const res = data.data as FlagType[];
  const retArray: FlagType[] = [];
  if (res) {
    res.map((item: any) => {
      if (phoneCode[item.iso2 as Iso2Code]) {
        const ret = {
          ...item,
          phoneCode: phoneCode[item.iso2 as Iso2Code],
          priceForMonth: Math.floor(Math.random() * 2000),
          priceForContract: Math.floor(Math.random() * 350),
        };
        retArray.push(ret);
      }
    });
  }
  return retArray;
};
