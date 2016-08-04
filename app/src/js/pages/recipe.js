import React from 'react';
import {Link} from 'react-router';

export default class RecipePage extends React.Component {
	render() {
		return (
			<main>
				<h1>Recipe Name</h1>
				<p>Short description.</p>
				<h2>Method / Instructions</h2>
				<ol>
					<li>
						Get your ingredients
					</li>
					<li>
						Mix the ingredients
					</li>
				</ol>
				<a href="#">Add recipe</a>
				<a href="#">Add category</a>
				<Link to="/list">
					Back to recipes
				</Link>
			</main>
		)
	}
}