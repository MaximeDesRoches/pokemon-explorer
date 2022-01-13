import { combineReducers } from 'redux';
import env from './env';
import pokemon from './pokemon';

export const rootReducer = combineReducers({
	pokemon: pokemon.reducer,
	env: env.reducer,
});
