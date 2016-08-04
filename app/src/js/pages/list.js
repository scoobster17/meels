import React from 'react';
import RecipeList from '../components/recipe-list';

export default class ListPage extends React.Component {
	render() {
		return (
			<main>
				<h1>Recipes</h1>
				<p>Here are all the recipes you have saved in your recipe book.</p>
				<RecipeList />
				<a href="#">Add recipe</a>
				<a href="#">Add category</a>
			</main>
		)
	}
}