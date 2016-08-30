// React dependencies
import React from 'react';

// Redux dependencies
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../config/mapping.js';

// App dependencies
import {Urls} from '../../config/constants';
import {handleData} from '../../data/data-handling';
import RecipePreview from './recipe-preview';

class RecipeList extends React.Component {

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

                // check returned as array
                if (!Array.isArray(recipes)) {
                    Object.assign([], recipes);
                }

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

                this.props.receivedRecipes(recipes);

                /*this.setState({
                    recipes: ,
                    noOfRecipes: noOfRecipes
                });*/

            },
            error: () => {
                // TODO user feedback
                console.log('Error with data');
            }
        });

    }

    render() {
        return (
            <ul>
                {
                    this.props.recipes.list.map((recipe) => {
                        return (
                            <RecipePreview name={recipe.name} tags={recipe.categories} key={recipe.id} id={recipe.id} />
                        )
                    })
                }
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
