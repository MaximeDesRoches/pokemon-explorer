import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../store';

const pokemonListStateSelector = (state: IRootState) => state.pokemon.list;
const pokemonSpeciesStateSelector = (state: IRootState) => state.pokemon.species;
const pokemonSpeciesNamesStateSelector = (state: IRootState) => state.pokemon.speciesNames;
const pokemonSpeciesFlavorTextsStateSelector = (state: IRootState) => state.pokemon.speciesFlavorTexts;
const pokemonTypesStateSelector = (state: IRootState) => state.pokemon.types;
const languageStateSelector = (state: IRootState) => state.env.language;

export type CompletePokemon = (Pokemon & {
	species:PokemonSpecies,
	names:PokemonSpeciesNames[],
	name:PokemonSpeciesNames,
	flavorTexts:PokemonSpeciesFlavorText[],
	types:(PokemonTypes & {
		color: string;
		names: TypeNames[];
		name: TypeNames;
	})[],
});

export const pokemonByIdSelector = (id: number) => createSelector([
	pokemonListStateSelector,
	pokemonSpeciesStateSelector,
	pokemonSpeciesNamesStateSelector,
	pokemonSpeciesFlavorTextsStateSelector,
	pokemonTypesStateSelector,
	languageStateSelector,
], (pokemons, species, speciesNames, speciesFlavorTexts, types, language):CompletePokemon | null => {
	const pokemon = pokemons.find(p => p.id === id);
	if (!pokemon) return null;
	if (species.length === 0 || speciesNames.length === 0 || speciesFlavorTexts.length === 0 || types.length === 0) return null;

	return {
		...pokemon,
		species: species.find(s => s.id === pokemon.speciesId),
		names: speciesNames.filter(s => s.pokemonSpeciesId === pokemon.speciesId).filter(s => s.localLanguageId === language),
		name: speciesNames.find(s => s.pokemonSpeciesId === pokemon.speciesId && s.localLanguageId === language),
		flavorTexts: speciesFlavorTexts.filter(s => s.speciesId === pokemon.speciesId).filter(f => f.languageId === language),
		types: types.filter(t => t.pokemonId === pokemon.id).map(t => ({
			...t,
			name: t.names.find(n => n.localLanguageId === language),
		})),
	} as CompletePokemon;
});

export const pokemonSelector = createSelector([
	pokemonListStateSelector,
	pokemonSpeciesStateSelector,
	pokemonSpeciesNamesStateSelector,
	pokemonSpeciesFlavorTextsStateSelector,
	pokemonTypesStateSelector,
	languageStateSelector,
], (pokemons, species, speciesNames, speciesFlavorTexts, types, language):CompletePokemon[] => {
	if (pokemons.length === 0 || species.length === 0 || speciesNames.length === 0 || speciesFlavorTexts.length === 0 || types.length === 0) return [];

	return pokemons.map(pokemon => {
		return {
			...pokemon,
			species: species.find(s => s.id === pokemon.speciesId),
			names: speciesNames.filter(s => s.pokemonSpeciesId === pokemon.speciesId).filter(s => s.localLanguageId === language),
			name: speciesNames.find(s => s.pokemonSpeciesId === pokemon.speciesId && s.localLanguageId === language),
			flavorTexts: speciesFlavorTexts.filter(s => s.speciesId === pokemon.speciesId).filter(f => f.languageId === language),
			types: types.filter(t => t.pokemonId === pokemon.id).map(t => ({
				...t,
				name: t.names.find(n => n.localLanguageId === language),
			})),
		};
	});
});