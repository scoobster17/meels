// React dependencies
import React from 'react';
import { Link } from 'react-router';

// App dependencies
import { Urls } from '../config/constants';
import { handleData } from '../data/data-handling';

export default class RecipePage extends React.Component {

	componentWillMount() {
		var recipeToFindId = this.props.params.recipeId;
		var recipe = this._getRecipeDetails(recipeToFindId);
	}

	render() {

		let recipe = this.props.recipes.currentRecipe;

		return (
			<main>
				<dl>
					<dt>Recipe Name</dt>
						<dd>
							<h1>
								{recipe.name}
							</h1>
						</dd>
					<dt>Description</dt>
						<dd>
							<p>{recipe.description}</p>
						</dd>
					<dt>Serves</dt>
						<dd>
							{
								recipe.serves === 1 ?
									recipe.serves + " person"
								:
									recipe.serves > 1 ?
										recipe.serves + " people"
									:
									""
							}
						</dd>
					<dt>Preparation time</dt>
						<dd>
							{recipe['prep-time'] && recipe['prep-time'].days !== "0" ? recipe['prep-time'].days + " days " : ""}
							{recipe['prep-time'] && recipe['prep-time'].hours !== "0" ? recipe['prep-time'].hours + " hours " : ""}
							{recipe['prep-time'] && recipe['prep-time'].minutes !== "0" ? recipe['prep-time'].minutes + " minutes" : ""}
						</dd>
					<dt>Cooking time</dt>
						<dd>
							{recipe['cooking-time'] && recipe['cooking-time'].days !== "0" ? recipe['cooking-time'].days + " days " : ""}
							{recipe['cooking-time'] && recipe['cooking-time'].hours !== "0" ? recipe['cooking-time'].hours + " hours " : ""}
							{recipe['cooking-time'] && recipe['cooking-time'].minutes !== "0" ? recipe['cooking-time'].minutes + " minutes" : ""}
						</dd>
					<dt>Total time</dt>
						<dd>
							{recipe['total-time'] && recipe['total-time'].days !== "0" ? recipe['total-time'].days + " days " : ""}
							{recipe['total-time'] && recipe['total-time'].hours !== "0" ? recipe['total-time'].hours + " hours " : ""}
							{recipe['total-time'] && recipe['total-time'].minutes !== "0" ? recipe['total-time'].minutes + " minutes" : ""}
						</dd>
					<dt>
						<h2>Ingredients</h2>
					</dt>
						<dd>
							<ul>
								{
									recipe.ingredients &&
									recipe.ingredients.map((ingredient, index) => {
										return <li key={index}>{ingredient.measure + ingredient.unit + " of " + ingredient.name}</li>
									})
								}
							</ul>
						</dd>
					<dt>
						<h2>Method / Instructions</h2>
					</dt>
						<dd>
							<ol>
								{
									recipe.instructions &&
									recipe.instructions.map((instruction, index) => {
										return <li key={index}>{instruction}</li>
									})
								}
							</ol>
						</dd>
					<dt>Tags</dt>
						<dd>
							<ul>
								{
									recipe.tags &&
									recipe.tags.map((tag, index) => {
										return <li key={index}>{tag}</li>
									})
								}
							</ul>
						</dd>
				</dl>
				<Link to="/newRecipe">
					Add a new recipe
				</Link>
				<Link to="/recipes">
					Back to recipes
				</Link>
			</main>
		)
	}

	_getRecipeDetails(recipeToFindId) {
		handleData({
			method: 'GET',
			url: Urls.data.base + "/recipes/" + recipeToFindId + ".json",
			success: (recipeObj) => {
				this.props.recipeReceived(recipeObj);
			}
		});
	}
}