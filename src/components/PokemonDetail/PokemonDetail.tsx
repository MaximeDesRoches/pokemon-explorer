import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { pokemonByIdSelector } from '../../selectors/pokemon';

import './_pokemon-detail.scss';

export default function PokemonDetail() {
	const { id } = useParams<{ id: string }>();
	const numericId = Number(id);
	const selector = useMemo(() => pokemonByIdSelector(numericId), [numericId]);
	const pokemon = useSelector(selector);

	if (Number.isNaN(numericId)) {
		return <div className="pokemon-detail empty"><Link to="/">← Back</Link><p>Invalid id.</p></div>;
	}

	if (!pokemon) {
		return <div className="pokemon-detail empty"><Link to="/">← Back</Link><p>Loading…</p></div>;
	}

	const flavor = pokemon.flavorTexts[0]?.flavorText.replace(/\s+/g, ' ');

	return (
		<div className="pokemon-detail" style={{ ['--color' as string]: pokemon.types[0].color }}>
			<div className="back"><Link to="/">← Back</Link></div>
			<div className="hero">
				<div className="bg" />
				<img
					className="sprite"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
					alt={pokemon.identifier}
					width="457"
					height="457"
				/>
			</div>
			<div className="body">
				<div className="number">#{pokemon.id}</div>
				<h1 className="name">{pokemon.name?.name ?? pokemon.identifier}</h1>
				<div className="types">
					{pokemon.types.map(type => (
						<span key={type.typeId} className="type" style={{ ['--color' as string]: type.color }}>
							{type?.name?.name}
						</span>
					))}
				</div>
				{flavor && <p className="flavor">{flavor}</p>}
			</div>
		</div>
	);
}
