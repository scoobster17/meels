/******************************************************************************/
// DEPENDENCIES
/******************************************************************************/

// React
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, Redirect } from 'react-router';

// Redux
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

// Page layout
import Layout from './layout/layout';

// Pages
import HomePage from './pages/home';
import CategoriesPage from './pages/categories';
import ListPage from './pages/list';
import RecipePage from './pages/recipe';
import AddPage from './pages/add';

// let store = createStore({});

/******************************************************************************/
// ROUTING
/******************************************************************************/

const app = (
	<Router history={hashHistory}>
		<Redirect from="/" to="/home" />
		<Route path="/" component={Layout}>
			<Route path="home" component={HomePage} />
			<Route path="categories" component={CategoriesPage} />
			<Route path="recipes" component={ListPage} />
			<Route path="recipes/:recipeId" component={RecipePage} />
			<Route path="newRecipe" component={AddPage} />
		</Route>
	</Router>
)

/******************************************************************************/
// APP INIT
/******************************************************************************/
ReactDOM.render(
	app,
	document.getElementById('container')
);