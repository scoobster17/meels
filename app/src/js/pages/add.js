import React from 'react';
import jQuery from 'jquery';

export default class AddPage extends React.Component {

	constructor() {
		super();

		this.state = {
			noOfRecipes: 0
		}
		this._saveRecipe = this._saveRecipe.bind(this);
	}

	componentWillMount() {
		this._getRecipes();
	}

	render() {
		return (
			<main>
				<h1>Add a new recipe</h1>
				<form onSubmit={this._saveRecipe}>
					<label htmlFor="">Recipe Name</label>
					<input type="text" ref={(input) => {this._name = input}} />
					<label htmlFor="italian">Italian</label>
					<input type="checkbox" name="tags" id="italian" value="Italian" ref={(tags) => {this._tags={};this._tags["0"] = tags}} />
					<label htmlFor="american">American</label>
					<input type="checkbox" name="tags" id="american" value="American" ref={(tags) => {this._tags["1"] = tags}} />
					<input type="submit" />
				</form>
				<a href="#">Add category</a>
			</main>
		)
	}

	_getRecipes() {
		jQuery.ajax({
			method: 'GET',
			url: 'https://meels-f1766.firebaseio.com/recipes.json',
			success: (recipesObj) => {

				this.setState({
					noOfRecipes: recipesObj.length
				});

			}
		});
	}

	_saveRecipe(event) {

		event.preventDefault();

		let tags = this._tags;
		let recipeData = {
			id: this.state.noOfRecipes,
			name: "" + this._name.value,
			tags: {}
		};
		let index = 0;

		for (let tag in tags) {
			if (tags[tag].checked) {
				recipeData.tags[index++] = tags[tag].value;
			}
		}
		console.log(recipeData);

		/*jQuery.ajax({
			method: 'PUT',
			url: "https://meels-f1766.firebaseio.com/recipes/" + this.state.noOfRecipes + ".json",
			data: JSON.stringify(recipeData),
			success: (x) => {
				console.log('success', x);
			}
		})*/
	}
}