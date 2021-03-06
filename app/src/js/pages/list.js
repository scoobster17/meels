// React dependencies
import React from 'react';
import { Link } from 'react-router';

// App dependencies
import RecipeList from '../components/recipes/recipe-list';

export default class ListPage extends React.Component {

	componentWillMount() {
		var queryStringObj = this.props.location.query;
		if (Object.keys(queryStringObj).length && queryStringObj.hasOwnProperty('category')) {
			this._filterValue = queryStringObj.category;
		} else {
			this._filterValue = '';
		}
	}
	render() {
		return (
			<main>
				<h1>Recipes</h1>
				<p>Here are all the recipes you have saved in your recipe book.</p>
				<RecipeList filter={this._filterValue} />
				<Link to="/newRecipe">
					Add recipe
				</Link>
			</main>
		)
	}
}