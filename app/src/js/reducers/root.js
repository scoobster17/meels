// Redux dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import recipes from './recipes';
import categories from './categories';

const rootReducer = combineReducers({
    recipes,
    categories,
    routing: routerReducer
});

export default rootReducer;