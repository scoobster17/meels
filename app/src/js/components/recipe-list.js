import React from 'react';
import RecipePreview from './recipe-preview';

export default class RecipeList extends React.Component {
	render() {
		return (
			<ul>
				<RecipePreview />
			</ul>
		)
	}
}
