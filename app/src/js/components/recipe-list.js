import React from 'react';
import RecipePreview from './recipe-preview';

import jQuery from 'jquery';

export default class RecipeList extends React.Component {

	constructor() {
		super();

		this.state = {
			recipes: [],
			noOfRecipes: 0
		}
	}

	componentWillMount() {
		this._getRecipes();
	}



	_getRecipes() {

		jQuery.ajax({
			method: 'GET',
			url: 'https://meels-f1766.firebaseio.com/recipes.json',
			success: (recipesObj) => {

				this.setState({
					recipes: recipesObj.map((recipe) => {
						return (
							<RecipePreview name={recipe.name} tags={recipe.categories} key={recipe.id} id={recipe.id} />
						)
					}),
					noOfRecipes: recipesObj.length
				});

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
