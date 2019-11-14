import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app.jsx';
import configureStore from './store';

import './styles/index.css';

const store = configureStore(window.initialStoreData);
window.dev = { store };

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('main')
);
