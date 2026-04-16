import React from 'react';
import { Link } from 'react-router-dom';

import './_pokemon-card.scss';

import { PokemonListItem } from '../../selectors/pokemon';

interface PokemonCardProps {
	pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }:PokemonCardProps) {
	const primaryColor = pokemon.typeLabels[0]?.color ?? '#888';
	return (
		<Link to={`/pokemon/${pokemon.id}`} className="pokemon-card" style={{ ['--color' as string]: primaryColor }}>
			<div className="bg">
				<img src={`${process.env.PUBLIC_URL}/images/pokeball.svg`} alt="" width="100" height="100" className="pokeball" />
			</div>
			<div className="infos">
				<div className="number">#{pokemon.id}</div>
				<div className="name">{pokemon.displayName}</div>
				<div className="types">
					{pokemon.typeLabels.map(type => (
						<div key={type.id} className="type" style={{ ['--color' as string]: type.color }}>
							{type.label}
						</div>
					))}
				</div>
			</div>
			<img className="sprite" loading="lazy" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} width="457" height="457" alt={pokemon.identifier} />
		</Link>
	);
}
