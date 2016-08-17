import React from 'react';
import {Link} from 'react-router';

export default class RecipePreview extends React.Component {
	render() {
		return (
			<li>
				<Link to={'/recipes/' + this.props.id}>
					{this.props.name}
					<img src="assets/img/recipes/hotdog.jpg" width="60" />
					<p>{this.props.tags}</p>
				</Link>
			</li>
		)
	}
}
