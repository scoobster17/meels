// React dependencies
import React from 'react';

// Redux dependencies
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../config/mapping.js';

// App dependencies
import {Urls} from '../../config/constants';
import {handleData} from '../../data/data-handling';
import RecipePreview from './recipe-preview';
import { convertRecipesToArray } from '../../utilities/utilities';

class RecipeList extends React.Component {

    componentWillMount() {
        this._getRecipes();
    }

    _getRecipes() {

        handleData({
            method: 'GET',
            url: Urls.data.recipes,
            success: (recipes) => {

                let recipesToShow = [];
                let recipesArray = convertRecipesToArray(recipes);

                // filter results if a filter value is supplied
                if (this.props.filter !== '') {

                    // loop through each recipe object to check for filter category
                    let noOfRecipes = recipesArray.length;
                    for (let i=0; i<noOfRecipes; i++) {

                        const currentRecipe = recipesArray[i];

                        // check if any tag matches the filter category
                        const checkTagsForFilterCategory = (tag) => {
                            return tag.toLowerCase() === this.props.filter;
                        };

                        // add to array if not there already
                        if (currentRecipe.tags.find(checkTagsForFilterCategory) != undefined) {
                            recipesToShow.push(currentRecipe);
                        }

                    }

                    // only pass filtered recipes
                    recipesArray = recipesToShow;

                }

                // pass recipes to state
                this.props.receivedRecipes(recipesArray);

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
                    this.props.recipes.list.length ?
                        this.props.recipes.list.map((recipe) => {
                            return (
                                <RecipePreview name={recipe.name} tags={recipe.categories} key={recipe.id} id={recipe.id} />
                            )
                        })
                    :
                    <p>You have no recipes saved yet.</p>
                }
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
