import React from 'react';
import jQuery from 'jquery';

import CategoriesList from '../components/categories-list';

export default class AddPage extends React.Component {

	constructor() {
		super();

		this.state = {
			noOfRecipes: 0,
			selectedTags: []
		}
		this._saveRecipe = this._saveRecipe.bind(this);
		this._setTags = this._setTags.bind(this);
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
					<input type="text" ref="name" />
					<CategoriesList setTags={this._setTags} />
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

	_setTags(event) {

		const checkbox = event.target;
		let newTags = this.state.selectedTags.slice();

		// if checked, add the tag to the tags array
		if (checkbox.checked) {
			newTags.push(checkbox.value);

		// if not checked, remove from the tags array
		} else {
			let tagToRemoveIndex = newTags.indexOf(checkbox.value);
			newTags.splice(tagToRemoveIndex, 1);
		}

		this.setState({
			selectedTags: newTags
		});

	}

	_saveRecipe(event) {

		event.preventDefault();

		let tags = this._tags;
		let recipeData = {
			id: this.state.noOfRecipes,
			name: "" + this.refs.name.value,
			tags: this.state.selectedTags
		};

		jQuery.ajax({
			method: 'PUT',
			url: "https://meels-f1766.firebaseio.com/recipes/" + this.state.noOfRecipes + ".json",
			data: JSON.stringify(recipeData),
			success: (x) => {
				console.log('success', x);
			}
		});

		// check for and add new category
	}
}