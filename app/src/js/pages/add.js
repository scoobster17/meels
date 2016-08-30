// React dependencies
import React from 'react';
import {Link} from 'react-router';

// App dependencies
import {Urls} from '../config/constants';
import {handleData} from '../data/data-handling';
import CategorySelectors from '../components/categories/category-selectors';
import Option from '../components/global/option';
import Spinner from '../components/global/spinner';
import Ingredient from '../components/recipes/ingredient';
import Instruction from '../components/recipes/instruction';

class AddPage extends React.Component {

	constructor() {
		super();

		this.state = {
			noOfRecipes: 0,
            recipeAdded: false,
			selectedTags: [],
            ingredients: [
                <Ingredient index="1" key="0" />
            ],
            instructions: [
                <Instruction index="1" key="0" />
            ]
		}
		this._saveRecipe = this._saveRecipe.bind(this);
        this._setTags = this._setTags.bind(this);
        this._addIngredient = this._addIngredient.bind(this);
        this._addInstruction = this._addInstruction.bind(this);
	}

	componentWillMount() {
		this._getRecipes();
	}

	render() {

        // set up JSX
        let days = [];
        let hours = [];
        let minutes = [];

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

		return (
			<main className="addRecipePage">
				<h1>Add a new recipe</h1>
				{
                    // if recipe not yet added show form
                    !this.props.recipes.recipeAdded ?

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
                                <select id="prep-days" name="prep-days" ref="prep-days" onChange={this._updateTotalTime.bind(this, 'days')}>
                                    {days}
                                </select>
                                <label htmlFor="prep-hours">Hours</label>
                                <select id="prep-hours" name="prep-hours" ref="prep-hours" onChange={this._updateTotalTime.bind(this, 'hours')}>
                                    {hours}
                                </select>
                                <label htmlFor="prep-minutes">Minutes</label>
                                <select id="prep-minutes" name="prep-minutes" ref="prep-minutes" onChange={this._updateTotalTime.bind(this, 'minutes')}>
                                    {minutes}
                                </select>
                            </div>
                            <div className="field">
                                <h3 className="label">Cooking time</h3>
                                <label htmlFor="cooking-days">Days</label>
                                <select id="cooking-days" name="cooking-days" ref="cooking-days" onChange={this._updateTotalTime.bind(this, 'days')}>
                                    {days}
                                </select>
                                <label htmlFor="cooking-hours">Hours</label>
                                <select id="cooking-hours" name="cooking-hours" ref="cooking-hours" onChange={this._updateTotalTime.bind(this, 'hours')}>
                                    {hours}
                                </select>
		    					<label htmlFor="cooking-minutes">Minutes</label>
                                <select id="cooking-minutes" name="cooking-minutes" ref="cooking-minutes" onChange={this._updateTotalTime.bind(this, 'minutes')}>
                                    {minutes}
                                </select>
                            </div>
                            <div className="field">
                                <h3 className="label">Total time</h3>
                                <div className="field">
                                    <label htmlFor="total-days">Days</label>
                                    <input type="text" disabled="disabled" id="total-days" ref="total-days" value="0" />
                                </div>
                                <div className="field">
                                    <label htmlFor="total-hours">Hours</label>
                                    <input type="text" disabled="disabled" id="total-hours" ref="total-hours" value="0" />
                                </div>
                                <div className="field">
                                    <label htmlFor="total-minutes">Minutes</label>
                                    <input type="text" disabled="disabled" id="total-minutes" ref="total-minutes" value="0" />
                                </div>
                            </div>
	    				</fieldset>
                        <fieldset id="ingredients">
                            <h2>Ingredients</h2>
                            {this.state.ingredients}
                            <button id="addIngredient" onClick={this._addIngredient}>Add ingredient to recipe</button>
                        </fieldset>
                        <fieldset id="instructions">
                            <h2>Instructions</h2>
                            {this.state.instructions}
                            <button id="addInstruction" onClick={this._addInstruction}>Add instruction to recipe</button>
                        </fieldset>

    					{ /* tags fieldset */ }
    					<CategorySelectors setTags={this._setTags} />

    					<input type="submit" />

    					{
    						// show the spinner only if the submission is awaiting a response
    						this.props.recipes.waitingForAddRecipeResponse && <Spinner />
    					}
                    </form>

                    :

                    // Show the above message if the recipe has been added
                    <p>Your recipe has been added.</p>

                }
                <Link to={'/recipes'}>
                    Go to recipes
                </Link>
			</main>
		)
	}

	_getRecipes() {

        // perform request for recipes data
        handleData({
            method: 'GET',
            url: Urls.data.recipes,
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

    _updateTotalTime(unit) {
        event.preventDefault();
        let elemToUpdate = document.getElementById('total-' + unit);
        let relevantPrepTimeElem = document.getElementById('prep-' + unit);
        let relevantCookingTimeElem = document.getElementById('cooking-' + unit);
        elemToUpdate.value = parseInt(relevantPrepTimeElem.value) + parseInt(relevantCookingTimeElem.value);
    }

    _addIngredient(event) {
        event.preventDefault();
        let newIngredients = this.state.ingredients;
        const noOfIngredients = newIngredients.length;
        newIngredients[noOfIngredients] = <Ingredient index={noOfIngredients + 1} key={noOfIngredients} />

        this.setState({
            ingredients: newIngredients
        })
    }

    _addInstruction(event) {
        event.preventDefault();
        let newInstructions = this.state.instructions;
        const noOfInstructions = newInstructions.length;
        newInstructions[noOfInstructions] = <Instruction index={noOfInstructions + 1} key={noOfInstructions} />

        this.setState({
            instructions: newInstructions
        })
    }

    _resetForm() {
        let form = document.querySelector('#addRecipeForm');
        if (form) form.reset();
    }

    _saveRecipe(event) {

        event.preventDefault();

        let recipeData = {
            id: this.state.noOfRecipes,
            name: this.refs.recipeName.value,
            description: this.refs.description.value,
            serves: this.refs.serves.value,
            "prep-time": {
                days: this.refs['prep-days'].value,
                hours: this.refs['prep-hours'].value,
                minutes: this.refs['prep-minutes'].value
            },
            "cooking-time": {
                days: this.refs['cooking-days'].value,
                hours: this.refs['cooking-hours'].value,
                minutes: this.refs['cooking-minutes'].value
            },
            'total-time': {
                days: this.refs['total-days'].value,
                hours: this.refs['total-hours'].value,
                minutes: this.refs['total-minutes'].value
            },
            ingredients: [],
            instructions: [],
            tags: this.state.selectedTags
        };

        const ingredientNames = document.querySelectorAll('#addRecipeForm [name^=ingredient-name]');
        const ingredientUnits = document.querySelectorAll('#addRecipeForm [name^=ingredient-unit]');
        const ingredientMeasures = document.querySelectorAll('#addRecipeForm [name^=ingredient-measure]');
        const noOfIngredients = ingredientNames.length;
        const instructions = document.querySelectorAll('#addRecipeForm [name^=instruction]');

        for (let i=0; i<noOfIngredients; i++) {
            recipeData.ingredients.push({
                name: ingredientNames[i].value,
                unit: ingredientUnits[i].value,
                measure: ingredientMeasures[i].value
            });
        };

        instructions.forEach((instruction) => {
            recipeData.instructions.push(instruction.value)
        });

        this.props.requestAddRecipe();

        // perform request for recipes data
        handleData({
            method: 'PUT',
            url: Urls.data.base + "/recipes/" + this.state.noOfRecipes + ".json",
			data: JSON.stringify(recipeData),
			success: () => {
                this.props.addRecipeSuccess();
                _resetForm();
			},
            error: () => {
                // to add feedback message to user
                this.props.addRecipeError();
            }
		});

	}
}

export default AddPage;