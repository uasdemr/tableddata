import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import tableReducer from './table-slice'

export const api = createAPI();


export const store = configureStore({
  reducer: {
    users: tableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
