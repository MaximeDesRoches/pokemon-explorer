import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../store';

const pokemonListStateSelector = (state: IRootState) => state.pokemon.list;
const pokemonSpeciesStateSelector = (state: IRootState) => state.pokemon.species;

export const pokemonSelector = createSelector([
	pokemonListStateSelector,
	pokemonSpeciesStateSelector,
], (pokemons, species) => {
	return pokemons.map(pokemon => {
		return {
			...pokemon,
			names: species.filter(s => s.pokemon_species_id === pokemon.species_id),
		};
	});
});