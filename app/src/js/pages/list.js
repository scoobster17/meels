import React from 'react';
import RecipeList from '../components/recipe-list';

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
				<a href="#">Add recipe</a>
			</main>
		)
	}
}