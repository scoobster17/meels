import React from 'react';
import {Link} from 'react-router';
import CategoriesList from '../components/categories/categories-list';

export default class CategoriesPage extends React.Component {
    render() {
        return (
            <main>
                <h1>Your recipes by category</h1>
                <p>Here are all the categories you have used for recipes saved in your recipe book. Categories that you have not used will not show up here.</p>
                <p>To make more categories show, add new recipes under the category you want to see! There is a list of categories that can be used on the <Link to="/newRecipe">add recipe page</Link></p>
                <CategoriesList />
                <Link to="/newRecipe">Add recipe</Link>
            </main>
        )
    }
}