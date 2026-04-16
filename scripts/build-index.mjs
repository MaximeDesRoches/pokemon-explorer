#!/usr/bin/env node
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, '../_working/json');
const outDir = resolve(__dirname, '../public/json');

const LANG = { fr: 5, en: 9 };
const langs = new Set(Object.values(LANG));

const TYPE_COLORS = {
	1: '#A8A77A', 2: '#C22E28', 3: '#A98FF3', 4: '#A33EA1', 5: '#E2BF65',
	6: '#B6A136', 7: '#A6B91A', 8: '#735797', 9: '#B7B7CE', 10: '#EE8130',
	11: '#6390F0', 12: '#7AC74C', 13: '#F7D02C', 14: '#F95587', 15: '#96D9D6',
	16: '#6F35FC', 17: '#705746', 18: '#D685AD',
};

const load = name => JSON.parse(readFileSync(resolve(srcDir, name), 'utf8'));

const pokemon = load('Pokemon.json').filter(p => p.isDefault);
const speciesNames = load('PokemonSpeciesNames.json');
const pokemonTypes = load('PokemonTypes.json');
const typeNames = load('TypeNames.json');

const namesBySpecies = new Map();
for (const n of speciesNames) {
	if (!langs.has(n.localLanguageId)) continue;
	const key = n.pokemonSpeciesId;
	if (!namesBySpecies.has(key)) namesBySpecies.set(key, {});
	const lang = n.localLanguageId === LANG.fr ? 'fr' : 'en';
	namesBySpecies.get(key)[lang] = n.name;
}

const typeNameById = new Map();
for (const n of typeNames) {
	if (!langs.has(n.localLanguageId)) continue;
	if (!typeNameById.has(n.typeId)) typeNameById.set(n.typeId, {});
	const lang = n.localLanguageId === LANG.fr ? 'fr' : 'en';
	typeNameById.get(n.typeId)[lang] = n.name;
}

const typesByPokemon = new Map();
for (const t of pokemonTypes) {
	if (!typesByPokemon.has(t.pokemonId)) typesByPokemon.set(t.pokemonId, []);
	typesByPokemon.get(t.pokemonId).push(t);
}

const index = pokemon.map(p => ({
	id: p.id,
	identifier: p.identifier,
	speciesId: p.speciesId,
	names: namesBySpecies.get(p.speciesId) ?? {},
	types: (typesByPokemon.get(p.id) ?? [])
		.sort((a, b) => a.slot - b.slot)
		.map(t => ({
			id: t.typeId,
			color: TYPE_COLORS[t.typeId],
			names: typeNameById.get(t.typeId) ?? {},
		})),
}));

const out = resolve(outDir, 'pokemon-index.json');
writeFileSync(out, JSON.stringify(index));
console.log(`pokemon-index.json: ${(statSync(out).size / 1024).toFixed(0)}KB (${index.length} rows)`);
