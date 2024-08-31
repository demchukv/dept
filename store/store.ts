import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from '@/store/web-store';
import { thunk } from 'redux-thunk';
// import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import accountSlice from '@/store/account/accountSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['account'],
};

const rootReducer = combineReducers({
  account: accountSlice,
});

export const makeStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store: any = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([thunk]),
    devTools: process.env.NODE_ENV !== 'production',
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// export const wrapper = createWrapper(makeStore, { debug: true });
