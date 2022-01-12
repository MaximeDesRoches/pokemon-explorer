
// @ts-check
import sha1 from 'sha1';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAppDispatch, IRootState } from '../store';

interface IUserReducers<T> {
	pending?: (state:T, action) => any,
	rejected?: (state:T, action) => any,
	fulfilled?: (state:T, action) => any,
}

interface IThunkApiConfig {
	dispatch:IAppDispatch,
	state:IRootState,
}

/**
Creates a thunk action that cannot be called with the same parameters before the previous identical one is resolved
Returns the redux action, with reducers as property, that can be added to extraReducers of slice creator.
*/
export function createDebouncedAsyncAction<T>(name:string, promiseCreator, userReducers:IUserReducers<T>) {
	const processing:{ [key:string]: Promise<any> } = {};
	const thunk = createAsyncThunk<any, any, IThunkApiConfig>(
		name,
		promiseCreator,
	);
	
	const debounced = (data = {}) => {
		return (dispatch) => {
			const hash = sha1(JSON.stringify(data || {}));
			if (processing[hash]) {
				return processing[hash];
			}
			
			processing[hash] = dispatch(thunk(data)).then(r => {
				processing[hash] = null;
				return r;
			}).catch(err => {
				processing[hash] = null;
				throw err;
			});
			return processing[hash];
		};
	};

	debounced.reducers = Object.keys(userReducers).reduce((carry, key) => {
		carry[thunk[key]] = userReducers[key];
		return carry;
	}, {});

	return debounced;
}
