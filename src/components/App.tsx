import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchPokemonIndex } from '../redux/pokemon';
import { IRootState, useAppDispatch } from '../store';
import PokemonList from './PokemonList/PokemonList';
import PokemonDetail from './PokemonDetail/PokemonDetail';

import './app.scss';
import { setLanguage } from '../redux/env';
import { LANGUAGES } from '../Constants';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchPokemonIndex());
	}, [dispatch]);

	const curLang = useSelector((state:IRootState) => state.env.language);

	return (
		<div className="App">
			<div className="menu">
				<div className="languages">
					<button className={curLang === LANGUAGES.fr ? 'active' : ''} onClick={() => dispatch(setLanguage(LANGUAGES.fr))}>FR</button>
					<button className={curLang === LANGUAGES.en ? 'active' : ''} onClick={() => dispatch(setLanguage(LANGUAGES.en))}>EN</button>
				</div>
			</div>
			<Routes>
				<Route path="/" element={<PokemonList />} />
				<Route path="/pokemon/:id" element={<PokemonDetail />} />
			</Routes>
		</div>
	);
}

export default App;
