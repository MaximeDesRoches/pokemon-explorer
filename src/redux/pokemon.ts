/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';
import { openDB } from 'idb';

import { LANGUAGES } from '../Constants';
import { createDebouncedAsyncAction } from '../utils/createDebouncedAsyncAction';

const pokemonInitialState = {
	list: [] as Pokemon[],
	species: [] as PokemonSpecies[],
	speciesNames: [] as PokemonSpeciesNames[],
	speciesFlavorTexts: [] as PokemonSpeciesFlavorText[],
	types: [] as (PokemonTypes & { color: string, names:TypeNames[], name?:TypeNames })[],
};

const PokemonColors = {
	1: '#A8A77A',
	10: '#EE8130',
	11: '#6390F0',
	13: '#F7D02C',
	12: '#7AC74C',
	15: '#96D9D6',
	2: '#C22E28',
	4: '#A33EA1',
	5: '#E2BF65',
	3: '#A98FF3',
	14: '#F95587',
	7: '#A6B91A',
	6: '#B6A136',
	8: '#735797',
	16: '#6F35FC',
	17: '#705746',
	9: '#B7B7CE',
	18: '#D685AD',
};

type PokemonState = typeof pokemonInitialState;

const database = openDB('pokemon_cache', 1, {
	upgrade(db) {
		db.createObjectStore('pokemon');
	},
});

function fetchOrCache<T>(url:string) {
	return database.then(db => {
		return db.get('pokemon', url).then(cached => {
			if (cached) {
				return cached;
			}
			return fetch(url).then(res => res.json() as Promise<T[]>);
		}).then((data:T[]) => {
			db.put('pokemon', data, url);
			return data;
		});
	});
}

export const fetchAllPokemon = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchAllPokemon',
	() => {
		return fetchOrCache<Pokemon>('/json/Pokemon.json')
			.then((json) => json.filter(p => p.isDefault));
	},
	{
		fulfilled: (state, action) => {
			state.list = action.payload;
		},
	},
);

export const fetchAllPokemonSpecies = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchAllPokemonSpecies',
	() => {
		return fetchOrCache<PokemonSpecies>('/json/PokemonSpecies.json').then(json => json);
	},
	{
		fulfilled: (state, action) => {
			state.species = action.payload;
		},
	},
);

export const fetchAllPokemonSpeciesNames = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchAllPokemonSpeciesNames',
	() => {
		return fetchOrCache<PokemonSpeciesNames>('/json/PokemonSpeciesNames.json')
			.then((json) => json.filter(s => Object.values(LANGUAGES).includes(s.localLanguageId)));
	},
	{
		fulfilled: (state, action) => {
			state.speciesNames = action.payload;
		},
	},
);

export const fetchAllPokemonSpeciesFlavorText = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchAllPokemonSpeciesFlavorText',
	() => {
		return fetchOrCache<PokemonSpeciesFlavorText>('/json/PokemonSpeciesFlavorText.json')
			.then((json) => json.filter(flavor => Object.values(LANGUAGES).includes(flavor.languageId)).reduce((list, flavor) => {
				if (list.find(f => f.speciesId === flavor.speciesId)) return list;
				list.push(flavor);
				return list;
			}, [] as PokemonSpeciesFlavorText[]));
	},
	{
		fulfilled: (state, action) => {
			state.speciesFlavorTexts = action.payload;
		},
	},
);

export const fetchAllPokemonTypes = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchAllPokemonTypes',
	() => {
		return Promise.all([
			fetchOrCache<PokemonTypes>('/json/PokemonTypes.json')
				.then((json) => json.map(type => {
					return {
						...type,
						color: PokemonColors[type.typeId],
					};
				})),
			fetchOrCache<TypeNames>('/json/TypeNames.json')
				.then((json) => json),
		]).then(([types, typeNames]) => {
			return types.map(type => ({
				...type,
				names: typeNames.filter(name => name.typeId === type.typeId),
			}));
		});
	},
	{
		fulfilled: (state, action) => {
			state.types = action.payload;
		},
	},
);

const pokemon = createSlice({
	name: 'pokemon',
	reducers: {},
	extraReducers: {
		...fetchAllPokemon.reducers,
		...fetchAllPokemonSpecies.reducers,
		...fetchAllPokemonSpeciesNames.reducers,
		...fetchAllPokemonSpeciesFlavorText.reducers,
		...fetchAllPokemonTypes.reducers,
	},
	initialState: pokemonInitialState,
});

export default pokemon;