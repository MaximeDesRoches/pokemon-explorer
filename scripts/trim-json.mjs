#!/usr/bin/env node
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonDir = resolve(__dirname, '../public/json');

const LANGUAGES = { en: 9, fr: 5 };
const langs = new Set(Object.values(LANGUAGES));

function load(name) {
	return JSON.parse(readFileSync(resolve(jsonDir, name), 'utf8'));
}

function save(name, data) {
	const before = statSync(resolve(jsonDir, name)).size;
	writeFileSync(resolve(jsonDir, name), JSON.stringify(data));
	const after = statSync(resolve(jsonDir, name)).size;
	console.log(`${name}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${data.length} rows)`);
}

const flavor = load('PokemonSpeciesFlavorText.json')
	.filter(f => langs.has(f.languageId))
	.reduce((list, f) => {
		if (list.some(x => x.speciesId === f.speciesId && x.languageId === f.languageId)) return list;
		list.push(f);
		return list;
	}, []);
save('PokemonSpeciesFlavorText.json', flavor);

const names = load('PokemonSpeciesNames.json').filter(n => langs.has(n.localLanguageId));
save('PokemonSpeciesNames.json', names);

const typeNames = load('TypeNames.json').filter(n => langs.has(n.localLanguageId));
save('TypeNames.json', typeNames);
