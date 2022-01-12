import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AnyAction, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer } from './redux';

const middleware:Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
	middleware.push(createLogger({ collapsed: true, diff: true }));
}

const store = configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
	reducer: rootReducer,
});


export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = ThunkDispatch<IRootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<IAppDispatch>();

export default store;
