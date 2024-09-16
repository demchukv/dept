import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { accoutTypeT, userInfoType } from '@/types/account';

export interface AccountState {
  user: userInfoType | null;
  currentAccount: number | null;
  accounts: accoutTypeT[] | null;
}

const initialState: AccountState = {
  user: {
    contract: 8490475,
    name: 'ТОВ Агропромбуд',
    email: 'mail_address@gmail.com',
    phone: '+38(097) 321-65-87',
    edrpou: 3508934009,
    balance: 1500,
  },
  currentAccount: 1,
  accounts: [
    {
      id: 1,
      account: 'company',
      name: 'ТОВ Агропромбуд',
      balance: 1500,
    },
    {
      id: 2,
      account: 'user',
      name: 'Шевченко Василь Петрович',
      balance: 100,
    },
    {
      id: 3,
      account: 'company',
      name: 'ФОП Шевченко Василь Петрович',
      balance: 0,
    },
  ],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<accoutTypeT[]>) => {
      // дані про список аккаунтів мають приходити від API і встановлюватись при авторизації
      state.accounts = action.payload;
    },
    setUser: (state, action: PayloadAction<userInfoType>) => {
      // При зміні поточного аккаунта має відправлятися запит до API і встановлюватись повна інформація про вибраний аккаунт
      state.user = action.payload;
    },
    setCurrentAccount: (state, action: PayloadAction<number>) => {
      // встановлює поточний аккаунт для якого переглядається інформація
      state.currentAccount = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      // баланс має оновлюватись при будь-яких змінах: поповнення або списання
      if (!state.accounts) return;
      const data = state.accounts.find(
        (acc: accoutTypeT) => acc.id === state.currentAccount,
      );
      if (!data) return;
      data.balance = action.payload;
    },
  },
});

export const { setUser, setAccounts, setCurrentAccount, setBalance } =
  accountSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.account.user;
export const selectAccounts = (state: RootState) => state.account.accounts;
export const selectCurrentAccount = (state: RootState) =>
  state.account.accounts.find(
    (acc: accoutTypeT) => acc.id === state.account.currentAccount,
  );
export const selectBalance = (state: RootState) => {
  const data = state.account.accounts.find(
    (acc: accoutTypeT) => acc.id === state.account.currentAccount,
  );
  if (!data) return 0;
  return data.balance;
};

export default accountSlice.reducer;
