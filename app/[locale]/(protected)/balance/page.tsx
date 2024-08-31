import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';
import { Metadata } from 'next';
// import { makeStore } from '@/store/store';
import { BalanceDashboard } from '@/app/components/balance/balance-dashboard';

export const metadata: Metadata = {
  title: 'Dept | Баланс',
  description: 'Dept - Інформація про баланс і операції клієнта компанії',
};

const i18nNamespaces = ['balance'];

interface BalancePageProps {
  params: { locale: string };
}

const BalancePage = async ({ params: { locale } }: BalancePageProps) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  // const store = makeStore();
  // const storeData = await store.getState();
  // const currentAccount = storeData.account.currentAccount;
  // console.log(currentAccount);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <BalanceDashboard />
    </TranslationsProvider>
  );
};

export default BalancePage;
