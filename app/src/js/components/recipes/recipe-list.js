import React from 'react';

import {Urls} from '../../config/constants';
import {handleData} from '../../data/data-handling';
import RecipePreview from './recipe-preview';

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

        handleData({
            method: 'GET',
            url: Urls.data.recipes,
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

            },
            error: () => {
                // TODO user feedback
                console.log('Error with data');
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
