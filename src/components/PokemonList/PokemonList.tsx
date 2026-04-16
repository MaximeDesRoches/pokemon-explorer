import React, { ChangeEvent, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { pokemonListSelector } from '../../selectors/pokemon';
import PokemonCard from '../PokemonCard/PokemonCard';

export default function PokemonList() {
	const pokemons = useSelector(pokemonListSelector);
	const [searchText, setSearchText] = React.useState('');

	const filteredPokemons = useMemo(() => {
		if (searchText === '') return pokemons;
		if (!isNaN(Number(searchText))) {
			return pokemons.filter(p => p.id === Number(searchText));
		}
		const lowered = searchText.toLowerCase();
		return pokemons.filter(p => (
			p.displayName.toLowerCase().includes(lowered)
				|| p.identifier.toLowerCase().includes(lowered)
		));
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
