import React from 'react';
import RecipePreview from './recipe-preview';

import jQuery from 'jquery';

export default class RecipeList extends React.Component {

    constructor() {
        super();

        this.state = {
            recipes: [],
            noOfRecipes: 0
        }
    }

    componentWillMount() {
        this._getRecipes();
    }

    _getRecipes() {

        jQuery.ajax({
            method: 'GET',
            url: 'https://meels-f1766.firebaseio.com/recipes.json',
            success: (recipes) => {

                let noOfRecipes = recipes.length;
                let recipesToShow = [];

                // filter results if a filter value is supplied
                if (this.props.filter !== '') {

                    // loop through each recipe object to check for filter category
                    for (let i=0; i<noOfRecipes; i++) {

                        const currentRecipe = recipes[i];

                        // check if any tag matches the filter category

                        const checkTagsForFilterCategory = (tag) => {
                            return tag.toLowerCase() === this.props.filter;
                        };

                        // add to array if not there already
                        if (currentRecipe.tags.find(checkTagsForFilterCategory) != undefined) {
                            recipesToShow.push(currentRecipe);
                        }

                    }

                    recipes = recipesToShow;

                }

                this.setState({
                    recipes: recipes.map((recipe) => {
                        return (
                            <RecipePreview name={recipe.name} tags={recipe.categories} key={recipe.id} id={recipe.id} />
                        )
                    }),
                    noOfRecipes: noOfRecipes
                });

            }
        });

    }

    render() {
        //const recipes = this._getRecipes();
        return (
            <ul>
                {this.state.recipes}
            </ul>
        )
    }
}
