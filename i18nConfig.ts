import { Config } from 'next-i18n-router/dist/types';

export const LOCALES = {
  EN: {
    code: 'en',
    upper: 'EN',
    name: 'English',
  },
  UA: {
    code: 'uk',
    upper: 'UA',
    name: 'Українська',
  },
};

export const i18nConfig: Config = {
  locales: [LOCALES.UA.code, LOCALES.EN.code],
  defaultLocale: LOCALES.UA.code,
  serverSetCookie: 'if-empty',
  prefixDefault: false,
};
