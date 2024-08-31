import initTranslations from '@/app/i18n';
import TranslationsProvider from '@/components/translations-provider';

// import { makeStore } from '@/store/store';
import { BalanceDashboard } from '@/app/components/balance/balance-dashboard';

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

// export async function getServersSideProps() {
//   const store = makeStore();
//   store.dispatch({ type: 'FETCH_DATA' });

//   return {
//     props: {
//       initialReduxState: store.getState(),
//     },
//   };
// }
