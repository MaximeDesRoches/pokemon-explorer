/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';
import { createDebouncedAsyncAction } from '../utils/createDebouncedAsyncAction';

const pokemonInitialState = {
	list: [] as {
		id: string,
		identifier: string,
		species_id: string,
		height: string,
		weight: string,
		base_experience: string,
		order: string,
		is_default: string,
	}[],
	species: [] as {
		pokemon_species_id: string,
		local_language_id: string,
		name: string,
		genus: string,
	}[],
};

type PokemonState = typeof pokemonInitialState;

export const fetchAllPokemon = createDebouncedAsyncAction<PokemonState>(
	'pokemon/fetchAllPokemon',
	() => {
		return fetch('/data/pokemon.csv').then(res => res.text()).then(text => {
			const rows = text.split('\n');
			rows.shift();

			return rows.map(row => {
				const [
					id,
					identifier,
					species_id,
					height,
					weight,
					base_experience,
					order,
					is_default,
				] = row.split(',');
				return {
					id,
					identifier,
					species_id,
					height,
					weight,
					base_experience,
					order,
					is_default,
				};
			});
		});
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
		return fetch('/data/pokemon_species_names.csv').then(res => res.text()).then(text => {
			const rows = text.split('\n');
			rows.shift();

			return rows.map(row => {
				const [
					pokemon_species_id,
					local_language_id,
					name,
					genus,
				] = row.split(',');
				return {
					pokemon_species_id,
					local_language_id,
					name,
					genus,
				};
			});
		});
	},
	{
		fulfilled: (state, action) => {
			state.species = action.payload;
		},
	},
);

const pokemon = createSlice({
	name: 'pokemon',
	reducers: {

	},
	extraReducers: {
		...fetchAllPokemon.reducers,
		...fetchAllPokemonSpecies.reducers,
	},
	initialState: pokemonInitialState,
});

export default pokemon;