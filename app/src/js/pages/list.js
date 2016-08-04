import React from 'react';
import RecipePreview from '../components/recipe-preview';

export default class ListPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Recipes</h1>
				<p>Here are all the recipes you have saved in your recipe book.</p>
				<ul>
					<RecipePreview />
				</ul>
				<a href="#">Add recipe</a>
				<a href="#">Add category</a>
			</div>
		)
	}
}