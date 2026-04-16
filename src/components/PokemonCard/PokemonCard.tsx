import React from 'react';
import { Link } from 'react-router-dom';

import './_pokemon-card.scss';

import { CompletePokemon } from '../../selectors/pokemon';

interface PokemonCardProps {
	pokemon: CompletePokemon;
}

export default function PokemonCard({ pokemon }:PokemonCardProps) {
	return (
		<Link to={`/pokemon/${pokemon.id}`} className="pokemon-card" style={{ ['--color' as string]: pokemon.types[0].color }}>
			<div className="bg">
				<img src={`${process.env.PUBLIC_URL}/images/pokeball.svg`} alt="" width="100" height="100" className="pokeball" />
			</div>
			<div className="infos">
				<div className="number">#{pokemon.id}</div>
				<div className="name">{pokemon.name.name}</div>
				<div className="types">
					{pokemon.types.map(type => (<div key={type.typeId} className="type" style={{ ['--color' as string]: type.color }}>{type?.name.name}</div>))}
				</div>
			</div>
			<img className="sprite" loading="lazy" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} width="457" height="457" alt={pokemon.identifier} />
		</Link>
	);
}
