import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../store';
import { PokemonDetail, PokemonIndexEntry } from '../redux/pokemon';
import { LANGUAGES } from '../Constants';

const indexStateSelector = (state: IRootState) => state.pokemon.index;
const detailStateSelector = (state: IRootState) => state.pokemon.details;
const languageStateSelector = (state: IRootState) => state.env.language;

function langKey(id: number): 'fr' | 'en' {
	return id === LANGUAGES.fr ? 'fr' : 'en';
}

export interface PokemonListItem extends PokemonIndexEntry {
	displayName: string;
	typeLabels: { id: number; color: string; label: string }[];
}

export const pokemonListSelector = createSelector(
	[indexStateSelector, languageStateSelector],
	(index, language): PokemonListItem[] => {
		const key = langKey(language);
		return index.map(p => ({
			...p,
			displayName: p.names[key] ?? p.identifier,
			typeLabels: p.types.map(t => ({
				id: t.id,
				color: t.color,
				label: t.names[key] ?? '',
			})),
		}));
	},
);

export const pokemonByIdSelector = (id: number) => createSelector(
	[indexStateSelector, detailStateSelector, languageStateSelector],
	(index, details, language) => {
		const entry = index.find(p => p.id === id);
		if (!entry) return null;
		const detail: PokemonDetail | undefined = details[id];
		const key = langKey(language);
		return {
			...entry,
			displayName: entry.names[key] ?? entry.identifier,
			typeLabels: entry.types.map(t => ({
				id: t.id,
				color: t.color,
				label: t.names[key] ?? '',
			})),
			detail,
			flavorText: detail?.flavorText[key],
		};
	},
);
