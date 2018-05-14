import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Map from './mapboxComponent/Mapbox.js'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

let store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={ store }>
		{/* <App /> */}
		<Map />
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
