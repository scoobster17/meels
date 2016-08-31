// React dependencies
import React from 'react';
import { Link } from 'react-router';

// Redux dependencies
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../config/mapping.js';

// App dependencies
import { Urls } from '../../config/constants';
import { handleData } from '../../data/data-handling';
import { convertRecipesToArray } from '../../utilities/utilities';
import Spinner from '../global/spinner';

class CategoriesList extends React.Component {

    componentWillMount() {
        this._getTags();
    }

    render() {
        return (
            <ul>
                {
                    this.props.categories.used.length ?
                        this.props.categories.used.sort().map((category, index) => {
                            return (
                                <li key={index}>
                                    <Link to={'/recipes?category=' + category.toLowerCase()}>
                                        { category }
                                    </Link>
                                </li>
                            )
                        })
                    :
                        <p>No categories used yet. Please make sure you assign categories to a recipe when adding.</p>
                }
                { this.props.categories.fetchingCategories && <Spinner /> }
            </ul>
        )
    }

    _getTags() {

        this.props.fetchingCategories();

        // perform request for recipes data
        handleData({
            method: 'GET',
            url: Urls.data.recipes,
            success: (recipes) => {

                const recipesArray = convertRecipesToArray(recipes);
                const noOfRecipes = recipesArray.length;
                let categoriesFound = [];

                // loop through each recipe object to make a list of categories
                for (let i=0; i<noOfRecipes; i++) {

                    const currentRecipe = recipesArray[i];
                    const noOfTags = currentRecipe.tags ? currentRecipe.tags.length : 0;

                    // check if each tag is yet accounted for
                    for (let j=0; j<noOfTags; j++) {

                        // add to array if not there already
                        if (categoriesFound.indexOf(currentRecipe.tags[j]) == -1) {
                            categoriesFound.push(currentRecipe.tags[j]);
                        }

                    }
                }

                // update the state with categories
                this.props.categoriesFound(categoriesFound);

            },
            error: () => {
                // user friendly error to be implemented
                console.log('Error getting data');
            }
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);