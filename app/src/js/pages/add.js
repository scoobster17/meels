import React from 'react';

export default class AddPage extends React.Component {
	render() {
		return (
			<main>
				<h1>Add a new recipe</h1>
				<form>
					<label htmlFor="">Recipe Name</label>
					<input type="text" />
				</form>
				<a href="#">Add category</a>
			</main>
		)
	}
}