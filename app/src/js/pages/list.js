import React from 'react';

export default class ListPage extends React.Component {
	render() {
		return (
			<div>
				<h1>Recipes</h1>
				<p>Here are all the recipes you have saved in your recipe book.</p>
				<ul>
					<li>
						<a href="#">Recipe 1</a>
					</li>
				</ul>
				<a href="#">Add recipe</a>
				<a href="#">Add category</a>
			</div>
		)
	}
}