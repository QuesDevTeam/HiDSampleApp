import { configureStore } from '@reduxjs/toolkit';
// @ts-ignore
import logger from 'redux-logger';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import reducer from './reducers';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = [];
    const defaultMiddlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }

    return [...defaultMiddlewares, ...middlewares];
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
