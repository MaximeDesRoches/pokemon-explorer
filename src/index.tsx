import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import store from './store';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

createRoot(container).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);
