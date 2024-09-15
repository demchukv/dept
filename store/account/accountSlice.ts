import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import { accoutTypeT, userInfoType } from '@/types/account';

export interface AccountState {
  user: userInfoType | null;
  currentAccount: accoutTypeT | null;
  accounts: accoutTypeT[] | null;
}

const initialState: AccountState = {
  user: {
    contract: 8490475,
    name: 'ТОВ Агропромбуд',
    email: 'mail_address@gmail.com',
    phone: '+38(097) 321-65-87',
    edrpou: 3508934009,
    balance: 500,
  },
  currentAccount: {
    id: 1,
    account: 'company',
    name: 'ТОВ Агропромбуд',
    balance: 500,
  },
  accounts: [
    {
      id: 1,
      account: 'company',
      name: 'ТОВ Агропромбуд',
      balance: 500,
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
      state.accounts = action.payload;
    },
    setUser: (state, action: PayloadAction<userInfoType>) => {
      state.user = action.payload;
    },
    setCurrentAccount: (state, action: PayloadAction<accoutTypeT>) => {
      state.currentAccount = action.payload;
    },
  },
});

export const { setUser, setAccounts, setCurrentAccount } = accountSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.account.user;
export const selectAccounts = (state: RootState) => state.account.accounts;
export const selectCurrentAccount = (state: RootState) =>
  state.account.currentAccount;
export const selectBalance = (state: RootState) =>
  state.account.currentAccount.balance;

export default accountSlice.reducer;
