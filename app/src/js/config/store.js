// React dependencies
import React from 'react';
import { browserHistory } from 'react-router';

// Redux dependencies
import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

// App dependencies
import rootReducer from '../reducers/root';
import Ingredient from '../components/recipes/ingredient';
import Instruction from '../components/recipes/instruction';

// Set the default state
const defaultState = {
    recipes: {
        ingredients: [
            <Ingredient index="1" key="0" />
        ],
        instructions: [
            <Instruction index="1" key="0" />
        ],
        list: [],
        selectedTags: [],
    },
    categories: {
        list: [],
        used: []
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