import React, { ChangeEvent, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { pokemonSelector } from '../../selectors/pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList() {
	const pokemons = useSelector(pokemonSelector);
	const [searchText, setSearchText] = React.useState('');

	const filteredPokemons = useMemo(() => {
		if (searchText === '') return pokemons;
		if (!isNaN(Number(searchText))) {
			return pokemons
				.filter(pokemon => pokemon.isDefault)
				.filter(pokemon => pokemon.id === Number(searchText));
		}
		return pokemons
			.filter(pokemon => pokemon.isDefault)
			.filter(pokemon => pokemon.names.find(name => name.name.toLowerCase().includes(searchText.toLowerCase())));
	}, [pokemons, searchText]);

	const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
	};

	return (
		<>
			<div className="search">
				<label htmlFor="pokemon_finder">Trouve ton pokemon</label>
				<input id="pokemon_finder" type="text" value={searchText} onChange={handleSearchTextChange} />
			</div>
			<div className="grid">
				{filteredPokemons.map(pokemon => (
					<PokemonCard pokemon={pokemon} key={pokemon.identifier} />
				))}
			</div>
		</>
	);
}
