import React from 'react';
import {Link} from 'react-router';

import {Urls} from '../../config/constants';
import {handleData} from '../../data/data-handling';

export default class CategoriesList extends React.Component {

    constructor() {
        super();

        this.state = {
            tags: []
        }
    }

    componentWillMount() {
        this._getTags();
    }

    render() {
        return (
            <ul>
                {this.state.tags}
            </ul>
        )
    }

    _getTags() {

        // perform request for recipes data
        handleData(

            // method
            'GET',

            // url
            Urls.data.recipes,

            // success callback
            (recipes) => {

                const noOfRecipes = recipes.length;
                let categoriesFound = [];

                // loop through each recipe object to make a list of categories
                for (let i=0; i<noOfRecipes; i++) {

                    const currentRecipe = recipes[i];
                    const noOfTags = currentRecipe.tags.length;

                    // check if each tag is yet accounted for
                    for (let j=0; j<noOfTags; j++) {

                        // add to array if not there already
                        if (categoriesFound.indexOf(currentRecipe.tags[j]) == -1) {
                            categoriesFound.push(currentRecipe.tags[j]);
                        }

                    }
                }

                // render list based on tags used
                this.setState({
                    tags: categoriesFound.sort().map((category, index) => {
                        return (
                            <li key={index}>
                                <Link to={'/recipes?category=' + category.toLowerCase()}>
                                    {category}
                                </Link>
                            </li>
                        )
                    })
                })
            },

            // error callback
            () => {
                // user friendly error to be implemented
                console.log('Error getting data');
            }
        );
    }
}