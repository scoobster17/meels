import React from 'react';
import jQuery from 'jquery';

import {Link} from 'react-router';

import CategoriesList from '../components/categories-list';
import Spinner from '../components/spinner';

export default class AddPage extends React.Component {

	constructor() {
		super();

		this.state = {
			noOfRecipes: 0,
			waitingForAddRecipe: false,
            recipeAdded: false,
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
				{
                    // if recipe not yet added show form
                    !this.state.recipeAdded ?

                    <form id="addRecipeForm" onSubmit={this._saveRecipe}>
                    	<p>Enter details for a new recipe here.</p>
                    	<fieldset>
                    		<h2>Core Details</h2>
                    		<div className="field">
		    					<label htmlFor="recipeName">Recipe Name</label>
		    					<input type="text" id="recipeName" ref="recipeName" />
		    				</div>
		    				<div className="field">
		    					<label htmlFor="description">Description</label>
		    					<textarea id="description" ref="description"></textarea>
		    				</div>
	    				</fieldset>

    					{ /* tags fieldset */ }
    					<CategoriesList setTags={this._setTags} />

    					<input type="submit" />

    					{
    						// show the spinner only if the submission is awaiting a response
    						this.state.waitingForAddRecipe && <Spinner />
    					}
    				</form>

                    :

                    // Show the above message if the recipe has been added
                    <p>Your recipe has been added.</p>

                }
                <Link to={'/list'}>
                    Go to recipes
                </Link>
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

        let form = document.querySelector('#addRecipeForm');
		let tags = this._tags;
		let recipeData = {
			id: this.state.noOfRecipes,
			name: "" + this.refs.recipeName.value,
			description: "" + this.refs.description.value,
			tags: this.state.selectedTags
		};

		this.setState({waitingForAddRecipe: true});

		jQuery.ajax({
			method: 'PUT',
			url: "https://meels-f1766.firebaseio.com/recipes/" + this.state.noOfRecipes + ".json",
			data: JSON.stringify(recipeData),
			success: () => {
                this.setState({
                	recipeAdded: true,
                	waitingForAddRecipe: false
                });
                form.reset();
			}
		});

		// check for and add new category
	}
}