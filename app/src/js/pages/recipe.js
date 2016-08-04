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
				<h1>
					{this.state.recipe.name}
				</h1>
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

		jQuery.ajax({
			method: 'GET',
			url: "data/recipe/" + recipeToFindId + ".json",
			success: (recipeObj) => {

				this.setState({
					recipe: recipeObj
				});

				// return recipesList;
			}
		});
	}
}