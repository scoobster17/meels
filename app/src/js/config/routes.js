// React dependencies
import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// Redux dependencies
import { Provider } from 'react-redux';
import store, { history } from './store';

// Pages (and container 'App' component)
import App from '../containers/mapping';
import HomePage from '../pages/home';
import CategoriesPage from '../pages/categories';
import ListPage from '../pages/list';
import RecipePage from '../pages/recipe';
import AddPage from '../pages/add';

const routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage} />
                <Route path="categories" component={CategoriesPage} />
                <Route path="recipes" component={ListPage} />
                <Route path="recipes/:recipeId" component={RecipePage} />
                <Route path="newRecipe" component={AddPage} />
            </Route>
        </Router>
    </Provider>
)

export default routes;