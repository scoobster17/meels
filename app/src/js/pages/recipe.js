import React from 'react';
import {Link} from 'react-router';
import jQuery from 'jquery';

export default class RecipePage extends React.Component {

	constructor() {
		super();

		this.state = {
			recipe: {}
		}
	}

	componentWillMount() {
		var recipeToFindId = this.props.params.recipeId;
		var recipe = this._getRecipeDetails(recipeToFindId);
	}

	render() {
		return (
			<main>
				<dl>
					<dt>Recipe Name</dt>
						<dd>
							<h1>
								{this.state.recipe.name}
							</h1>
						</dd>
					<dt>Description</dt>
						<dd>
							<p>{this.state.recipe.description}</p>
						</dd>
					<dt>Serves</dt>
						<dd>
							{
								this.state.recipe.serves === 1 ?
									this.state.recipe.serves + " person"
								:
									this.state.recipe.serves > 1 ?
										this.state.recipe.serves + " people"
									:
									""
							}
						</dd>
					<dt>Preparation time</dt>
						<dd>
							{this.state.recipe['prep-time'] && this.state.recipe['prep-time'].days !== "0" ? this.state.recipe['prep-time'].days + " days " : ""}
							{this.state.recipe['prep-time'] && this.state.recipe['prep-time'].hours !== "0" ? this.state.recipe['prep-time'].hours + " hours " : ""}
							{this.state.recipe['prep-time'] && this.state.recipe['prep-time'].minutes !== "0" ? this.state.recipe['prep-time'].minutes + " minutes" : ""}
						</dd>
					<dt>Cooking time</dt>
						<dd>
							{this.state.recipe['cooking-time'] && this.state.recipe['cooking-time'].days !== "0" ? this.state.recipe['cooking-time'].days + " days " : ""}
							{this.state.recipe['cooking-time'] && this.state.recipe['cooking-time'].hours !== "0" ? this.state.recipe['cooking-time'].hours + " hours " : ""}
							{this.state.recipe['cooking-time'] && this.state.recipe['cooking-time'].minutes !== "0" ? this.state.recipe['cooking-time'].minutes + " minutes" : ""}
						</dd>
					<dt>Total time</dt>
						<dd>
							{this.state.recipe['total-time'] && this.state.recipe['total-time'].days !== "0" ? this.state.recipe['total-time'].days + " days " : ""}
							{this.state.recipe['total-time'] && this.state.recipe['total-time'].hours !== "0" ? this.state.recipe['total-time'].hours + " hours " : ""}
							{this.state.recipe['total-time'] && this.state.recipe['total-time'].minutes !== "0" ? this.state.recipe['total-time'].minutes + " minutes" : ""}
						</dd>
					<dt>
						<h2>Ingredients</h2>
					</dt>
						<dd>
							<ul>
								{
									this.state.recipe.ingredients &&
									this.state.recipe.ingredients.map((ingredient, index) => {
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
									this.state.recipe.instructions &&
									this.state.recipe.instructions.map((instruction, index) => {
										return <li key={index}>{instruction}</li>
									})
								}
							</ol>
						</dd>
					<dt>Tags</dt>
						<dd>
							<ul>
								{
									this.state.recipe.tags &&
									this.state.recipe.tags.map((tag, index) => {
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
		jQuery.ajax({
			method: 'GET',
			url: "https://meels-f1766.firebaseio.com/recipes/" + recipeToFindId + ".json",
			success: (recipeObj) => {
				this.setState({
					recipe: recipeObj
				});
			}
		});
	}
}