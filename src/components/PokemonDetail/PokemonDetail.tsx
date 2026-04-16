import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { pokemonByIdSelector } from '../../selectors/pokemon';
import { fetchPokemonDetail } from '../../redux/pokemon';
import { useAppDispatch } from '../../store';

import './_pokemon-detail.scss';

export default function PokemonDetail() {
	const { id } = useParams<{ id: string }>();
	const numericId = Number(id);
	const selector = useMemo(() => pokemonByIdSelector(numericId), [numericId]);
	const pokemon = useSelector(selector);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!Number.isNaN(numericId)) dispatch(fetchPokemonDetail(numericId));
	}, [dispatch, numericId]);

	if (Number.isNaN(numericId)) {
		return <div className="pokemon-detail empty"><Link to="/">← Back</Link><p>Invalid id.</p></div>;
	}

	if (!pokemon) {
		return <div className="pokemon-detail empty"><Link to="/">← Back</Link><p>Loading…</p></div>;
	}

	const primaryColor = pokemon.typeLabels[0]?.color ?? '#888';

	return (
		<div className="pokemon-detail" style={{ ['--color' as string]: primaryColor }}>
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
				<h1 className="name">{pokemon.displayName}</h1>
				<div className="types">
					{pokemon.typeLabels.map(type => (
						<span key={type.id} className="type" style={{ ['--color' as string]: type.color }}>
							{type.label}
						</span>
					))}
				</div>
				{pokemon.flavorText && <p className="flavor">{pokemon.flavorText}</p>}
				{pokemon.detail && (
					<dl className="stats">
						<dt>Height</dt><dd>{pokemon.detail.height / 10} m</dd>
						<dt>Weight</dt><dd>{pokemon.detail.weight / 10} kg</dd>
						{pokemon.detail.stats.map(stat => (
							<React.Fragment key={stat.name}>
								<dt>{stat.name}</dt><dd>{stat.base}</dd>
							</React.Fragment>
						))}
					</dl>
				)}
			</div>
		</div>
	);
}
