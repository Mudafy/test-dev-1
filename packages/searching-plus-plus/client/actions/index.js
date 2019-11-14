import fetchPonyfill from 'fetch-ponyfill';
const { fetch } = fetchPonyfill();

export const ACTION_TYPES = {
    SEARCH: 'search',
    RESULT: 'result'
}

const ACTIONS = {
    resultsReady: (results) => ({
        type: ACTION_TYPES.RESULT,
        results: results
    }),

    searchingFor: (text) => ({
        type: ACTION_TYPES.SEARCH,
        text: text
    }),
    searchFor: (text) => function asyncSearch(dispatch) {
        if (!text) { return; }
        dispatch(ACTIONS.searchingFor(text));
        fetch(`/api/v1/search?q=${encodeURIComponent(text)}`).then((result) => {
            if (!result.ok) { return; }
            result.json().then((json) => {
                console.log('results', json.results);
                dispatch(ACTIONS.resultsReady(json.results));
            })
        });
    }
};

export default ACTIONS;
