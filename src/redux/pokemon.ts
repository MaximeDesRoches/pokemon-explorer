import { createSlice } from '@reduxjs/toolkit';
import { openDB } from 'idb';

import { createDebouncedAsyncAction } from '../utils/createDebouncedAsyncAction';

export interface PokemonIndexEntry {
	id: number;
	identifier: string;
	speciesId: number;
	names: { fr?: string; en?: string };
	types: {
		id: number;
		color: string;
		names: { fr?: string; en?: string };
	}[];
}

export interface PokemonDetail {
	id: number;
	flavorText: { fr?: string; en?: string };
	height: number;
	weight: number;
	stats: { name: string; base: number }[];
}

const pokemonInitialState = {
	index: [] as PokemonIndexEntry[],
	details: {} as Record<number, PokemonDetail>,
};

type PokemonState = typeof pokemonInitialState;

const database = openDB('pokemon_cache', 1, {
	upgrade(db) {
		db.createObjectStore('pokemon');
	},
});

function fetchOrCache<T>(url: string): Promise<T> {
	return database.then(db => (
		db.get('pokemon', url).then(cached => {
			if (cached) return cached;
			return fetch(url).then(res => res.json());
		}).then((data: T) => {
			db.put('pokemon', data, url);
			return data;
		})
	));
}

export const fetchPokemonIndex = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchIndex',
	() => fetchOrCache<PokemonIndexEntry[]>('./json/pokemon-index.json'),
	{
		fulfilled: (state, action) => {
			state.index = action.payload;
		},
	},
);

interface SpeciesResponse {
	id: number;
	flavor_text_entries: { flavor_text: string; language: { name: string } }[];
}

interface PokemonResponse {
	id: number;
	height: number;
	weight: number;
	stats: { base_stat: number; stat: { name: string } }[];
}

async function fetchDetail(id: number): Promise<PokemonDetail> {
	const [species, basics] = await Promise.all([
		fetchOrCache<SpeciesResponse>(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
		fetchOrCache<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`),
	]);

	const flavorText: PokemonDetail['flavorText'] = {};
	for (const entry of species.flavor_text_entries) {
		const lang = entry.language.name;
		if ((lang === 'fr' || lang === 'en') && !flavorText[lang]) {
			flavorText[lang] = entry.flavor_text.replace(/[\f\n]/g, ' ');
		}
	}

	return {
		id,
		flavorText,
		height: basics.height,
		weight: basics.weight,
		stats: basics.stats.map(s => ({ name: s.stat.name, base: s.base_stat })),
	};
}

export const fetchPokemonDetail = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchDetail',
	(id: number) => fetchDetail(id),
	{
		fulfilled: (state, action) => {
			state.details[action.payload.id] = action.payload;
		},
	},
);

const pokemon = createSlice({
	name: 'pokemon',
	reducers: {},
	extraReducers: {
		...fetchPokemonIndex.reducers,
		...fetchPokemonDetail.reducers,
	},
	initialState: pokemonInitialState,
});

export default pokemon;
