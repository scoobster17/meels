import React from 'react';
import RecipePreview from './recipe-preview';

import jQuery from 'jquery';

export default class RecipeList extends React.Component {

	constructor() {
		super();

		this.state = {
			recipes: []
		}
	}

	componentWillMount() {
		this._getRecipes();
	}



	_getRecipes() {

		jQuery.ajax({
			method: 'GET',
			url: 'data/recipes.json',
			success: (recipesObj) => {

				this.setState({
					recipes: recipesObj.recipes.map((recipe) => {
						return (
							<RecipePreview name={recipe.name} tags={recipe.categories} key={recipe.id} id={recipe.id} />
						)
					})
				});

				// return recipesList;
			}
		});

	}

	render() {
		//const recipes = this._getRecipes();
		return (
			<ul>
				{this.state.recipes}
			</ul>
		)
	}
}
