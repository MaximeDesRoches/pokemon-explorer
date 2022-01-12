import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllPokemon, fetchAllPokemonSpecies } from '../redux/pokemon';
import { pokemonSelector } from '../selectors/pokemon';
import { useAppDispatch } from '../store';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllPokemon());
		dispatch(fetchAllPokemonSpecies());
	}, []);

	const pokemons = useSelector(pokemonSelector);

	return (
		<div className="App">
			<table>
				<tbody>
					{pokemons.map(pokemon => {
						return (
							<tr key={pokemon.id}>
								<td>{pokemon.identifier}</td>
								{pokemon.names.map(name => <td key={name.pokemon_species_id + name.local_language_id}>{name.name}</td>)}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default App;
