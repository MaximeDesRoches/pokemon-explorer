import { createSlice } from '@reduxjs/toolkit';
import { LANGUAGES } from '../Constants';

const envState = {
	language: LANGUAGES.fr,
};

const env = createSlice({
	name: 'env',
	reducers: {
		setLanguage: (state, action:{ payload: number }) => {
			state.language = action.payload;
		},
	},
	initialState: envState,
});

export default env;

export const { setLanguage } = env.actions;