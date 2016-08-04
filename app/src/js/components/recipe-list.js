import React from 'react';
import RecipePreview from './recipe-preview';

export default class RecipeList extends React.Component {
	render() {
		const recipes = this._getRecipes();
		return (
			<ul>
				{recipes}
			</ul>
		)
	};

	_getRecipes() {
		const recipesList = [
			{ id: 1, name: 'Spaghetti Bolognese', categories: ["Italian"] },
			{ id: 2, name: 'Chicken Madras', categories: ["Indian", "Curry"] }
		];

		return recipesList.map((recipe) => {
			return (
				<RecipePreview name={recipe.name} tags={recipe.categories} key={recipe.id} id={recipe.id} />
			)
		});
	}
}
