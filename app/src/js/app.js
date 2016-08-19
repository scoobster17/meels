/******************************************************************************/
// LIBRARY DEPENDENCIES
/******************************************************************************/

// React
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Redirect } from 'react-router';

// Redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// React Router Redux
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/******************************************************************************/
// APP DEPENDENCIES
/******************************************************************************/

// Page layout
import Layout from './layout/layout';

// Pages
import HomePage from './pages/home';
import CategoriesPage from './pages/categories';
import ListPage from './pages/list';
import RecipePage from './pages/recipe';
import AddPage from './pages/add';

/******************************************************************************/
// STATE DEPENDENCIES
/******************************************************************************/

// Reducers
import recipesReducer from './reducers/recipes-reducer';

// Store
const store = createStore(
	combineReducers({
		recipesReducer,
		routing: routerReducer
	})
);

const history = syncHistoryWithStore(browserHistory, store)

/******************************************************************************/
// ROUTING
/******************************************************************************/

const app = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Redirect from="/" to="/home" />
			<Route path="/" component={Layout}>
				<Route path="home" component={HomePage} />
				<Route path="categories" component={CategoriesPage} />
				<Route path="recipes" component={ListPage} />
				<Route path="recipes/:recipeId" component={RecipePage} />
				<Route path="newRecipe" component={AddPage} />
			</Route>
		</Router>
	</Provider>
)

/******************************************************************************/
// APP INIT
/******************************************************************************/

ReactDOM.render(
	app,
	document.getElementById('container')
);