import React from 'react';
import {Link} from 'react-router';

export default class HomePage extends React.Component {
	render() {
		return (
			<main>
				<h1>Meels</h1>
				<p>A recipe book to store all your favourite meals, or meels.</p>
				<ul>
					<li>
						<Link to="/recipes">
							Go to recipes
						</Link>
					</li>
					<li>
						<Link to="/categories">
							Pick a recipe category
						</Link>
					</li>
					<li>
						<Link to="/newRecipe">
							New recipe
						</Link>
					</li>
				</ul>
			</main>
		)
	}
}