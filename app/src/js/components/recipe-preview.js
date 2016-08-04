import React from 'react';
import {Link} from 'react-router';

export default class RecipePreview extends React.Component {
	render() {
		return (
			<li>
				<Link to="/recipe">
					Recipe Name
					<img src="assets/img/recipes/hotdog.jpg" width="60" />
				</Link>
			</li>
		)
	}
}
