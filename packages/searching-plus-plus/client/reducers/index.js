import { ACTION_TYPES } from '../actions';


const initial = {
    text: '',
    results: [],
};

function doSearch(text) {
    fetch('/api/v1/search');
}

function reducer(state = initial, action) {
    switch (action.type) {
        case ACTION_TYPES.SEARCH:
            doSearch(action.text);
            return { ...state, search: action.text };
            break;
        case ACTION_TYPES.RESULT:
            return { ...state, results: action.results };
            break;
    }
    return state;
}

module.exports = reducer;
