import React from 'react';
import jQuery from 'jquery';

import {Link} from 'react-router';

import CategorySelectors from '../components/category-selectors';
import Option from '../components/option';
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
        this._updateUnitIndicator = this._updateUnitIndicator.bind(this);
	}

	componentWillMount() {
		this._getRecipes();
	}

	render() {

        // set up JSX
        let days = [];
        let hours = [];
        let minutes = [];
        const units = [' (none)', 'g (grams)', 'kg (kilograms)', 'tsp (teaspoons)', 'tbsp (tablespoons)', 'ml (millilitres)', 'l (litres)', 'lb (pounds)'];
        const noOfUnits = units.length;
        let unitOptions = [];

        // days
        for (let i=0; i<8; i++) {
            days.push(<Option text={i} value={i} key={i-1} />);
        }

        // hours
        for (let j=0; j<24; j++) {
            hours.push(<Option text={j} value={j} key={j-1} />);
        }

        // minutes
        for (let k=0; k<60; k++) {
            minutes.push(<Option text={k} value={k} key={k-1} />);
        }

        // units
        for (let l=0; l<noOfUnits; l++) {
            let split = units[l].split(' (');
            let text = split[1] ? split[1].substring(0, split[1].length-1) : '';
            let value = split[0];
            unitOptions.push(<Option text={text} value={value} key={l} />);
        }

		return (
			<main className="addRecipePage">
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
		    					<input type="text" id="recipeName" ref="recipeName" placeholder="Spaghetti Bolognese" />
		    				</div>
		    				<div className="field">
                                <label htmlFor="description">Description</label>
                                <textarea id="description" ref="description" placeholder="The family favourite; an italian pasta dish consisting of spaghetti served with a ground meat sauce."></textarea>
                            </div>
                            <div className="field">
                                <label htmlFor="serves">Serves</label>
                                <input type="number" id="serves" ref="serves" placeholder="2" />
                            </div>
                            <div className="field">
                                <h3 className="label">Preperation time</h3>
                                <label htmlFor="prep-days">Days</label>
                                <select id="prep-days" name="prep-days">
                                    {days}
                                </select>
                                <label htmlFor="prep-hours">Hours</label>
                                <select id="prep-hours" name="prep-hours">
                                    {hours}
                                </select>
                                <label htmlFor="prep-minutes">Minutes</label>
                                <select id="prep-minutes" name="prep-minutes">
                                    {minutes}
                                </select>
                            </div>
                            <div className="field">
                                <h3 className="label">Cooking time</h3>
                                <label htmlFor="cooking-days">Days</label>
                                <select id="cooking-days" name="cooking-days">
                                    {days}
                                </select>
                                <label htmlFor="cooking-hours">Hours</label>
                                <select id="cooking-hours" name="cooking-hours">
                                    {hours}
                                </select>
		    					<label htmlFor="cooking-minutes">Minutes</label>
                                <select id="cooking-minutes" name="cooking-minutes">
                                    {minutes}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="total-time">Total time</label>
                                <input type="text" disabled="disabled" id="total-time" ref="total-time" value="0 minutes" />
                            </div>
	    				</fieldset>
                        <fieldset>
                            <h2>Ingredients</h2>
                            <div className="field">
                                <label htmlFor="ingredient-name">Ingredient Name</label>
                                <input type="text" id="ingredient-name" name="ingredient-name" placeholder="Salt" />
                            </div>
                            <div className="field">
                                <label htmlFor="ingredient-unit">Unit</label>
                                <select id="ingredient-unit" name="ingredient-unit" onChange={this._updateUnitIndicator}>
                                    {unitOptions}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="ingredient-measure">Measure</label>
                                <input type="text" id="ingredient-measure" name="ingredient-measure" placeholder="A pinch / 3 / 100" />
                                <p id="unitIndicator" className="unitIndicator" aria-hidden="true"></p>
                            </div>
                        </fieldset>
                        <fieldset>
                            <h2>Instructions</h2>
                            <div className="field">
                                <label htmlFor="new-instruction">Description</label>
                                <textarea id="new-instruction" ref="new-instruction" placeholder="Pre-heat oven to 200&deg; Celcius for a total of 20 minutes."></textarea>
                            </div>
                        </fieldset>

    					{ /* tags fieldset */ }
    					<CategorySelectors selectable={true} setTags={this._setTags} />

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

    _updateUnitIndicator(event) {
        const unit = event.target.value;
        const unitIndicator = document.querySelector('#unitIndicator');

        unitIndicator.innerHTML = unit;
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