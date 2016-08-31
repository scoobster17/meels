// React dependencies
import { browserHistory } from 'react-router';

// Redux dependencies
import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

// Reducers
import rootReducer from '../reducers/root';

// Set the default state
const defaultState = {
    recipes: {
        list: []
    },
    categories: {
        list: []
    }
}

// Enable Redux Dev Tools
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

// Create Store for tracking state
const store = createStore(rootReducer, defaultState, enhancers);

// Sync browser history with the store
export const history = syncHistoryWithStore(browserHistory, store);

export default store;