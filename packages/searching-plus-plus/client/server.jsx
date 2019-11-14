import App from './components/App';
import configureStore from './store';
import fs from 'fs';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

// eslint-disable-next-line no-sync
const template = fs.readFileSync(__dirname + '/index.html', 'utf8');

export default function renderApp() {
    const store = configureStore();
    const state = store.getState();

    const rendered = renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );

    const page = template
        .replace('<div id="main"></div>', `<div id="main">${rendered}</div>`);

    return page;
}
