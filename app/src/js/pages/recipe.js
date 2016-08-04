import React from 'react';
import {Link} from 'react-router';

export default class RecipePage extends React.Component {
	render() {

		var recipeToFindId = this.props.params.recipeId;

		var recipe = this._getRecipeDetails(recipeToFindId);

		return (
			<main>
				<h1>{recipe.name}</h1>
				<p>Short description.</p>
				<h2>Method / Instructions</h2>
				<ol>
					<li>
						Get your ingredients
					</li>
					<li>
						Mix the ingredients
					</li>
				</ol>
				<a href="#">Add recipe</a>
				<a href="#">Add category</a>
				<Link to="/list">
					Back to recipes
				</Link>
			</main>
		)
	}

	_getRecipeDetails(recipeToFindId) {
		const recipesList = [
			{ id: 1, name: 'Spaghetti Bolognese', categories: ["Italian"] },
			{ id: 2, name: 'Chicken Madras', categories: ["Indian", "Curry"] }
		];

		var matchingRecipes = recipesList.filter((recipe) => {
			return recipe.id == recipeToFindId;
		})
		return matchingRecipes[0];
	}
}