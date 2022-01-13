import React, { ChangeEvent, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllPokemon, fetchAllPokemonSpecies, fetchAllPokemonSpeciesFlavorText, fetchAllPokemonSpeciesNames, fetchAllPokemonTypes } from '../redux/pokemon';
import { pokemonSelector } from '../selectors/pokemon';
import { IRootState, useAppDispatch } from '../store';
import PokemonCard from './PokemonCard/PokemonCard';

import './app.scss';
import { setLanguage } from '../redux/env';
import { LANGUAGES } from '../Constants';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllPokemon());
		dispatch(fetchAllPokemonSpecies());
		dispatch(fetchAllPokemonSpeciesNames());
		dispatch(fetchAllPokemonSpeciesFlavorText());
		dispatch(fetchAllPokemonTypes());
	}, []);

	const curLang = useSelector((state:IRootState) => state.env.language);
	const pokemons = useSelector(pokemonSelector);
	const [searchText, setSearchText] = React.useState('');

	const filteredPokemons = useMemo(() => {
		if (searchText === '') return pokemons;
		if (!isNaN(Number(searchText))) {
			return pokemons
				.filter(pokemon => pokemon.isDefault)
				.filter(pokemon => {
					return pokemon.id === Number(searchText);
				});
		}
		return pokemons
			.filter(pokemon => pokemon.isDefault)
			.filter(pokemon => pokemon.names.find(name => name.name.toLowerCase().includes(searchText.toLowerCase())));
	}, [pokemons, searchText]);

	const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return (
		<div className="App">
			<div className="menu">
				<label htmlFor="pokemon_finder">Trouve ton pokemon</label>
				<input id="pokemon_finder" type="text" value={searchText} onChange={handleSearchTextChange} />

				<div className="languages">
					<button className={curLang === LANGUAGES.fr ? 'active' : ''} onClick={() => dispatch(setLanguage(LANGUAGES.fr))}>FR</button>
					<button className={curLang === LANGUAGES.en ? 'active' : ''} onClick={() => dispatch(setLanguage(LANGUAGES.en))}>EN</button>
				</div>
			</div>
			<div className="grid">
				{filteredPokemons.map(pokemon => (
					<PokemonCard pokemon={pokemon} key={pokemon.identifier} />
				))}
			</div>
		</div>
	);
}

export default App;
