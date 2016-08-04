import React from 'react';

export default class HomePage extends React.Component {
	render() {
		return (
			<main>
				<h1>Meels</h1>
				<p>A recipe book to store all your favourite meals, or meels.</p>
				<h2>Categories</h2>
				<ul>
					<li>
						<a href="#">Curry</a>
					</li>
				</ul>
				<a href="#">Add recipe</a>
				<a href="#">Add category</a>
			</main>
		)
	}
}