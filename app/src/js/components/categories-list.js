import React from 'react';

import jQuery from 'jquery';

import Category from './category';

export default class CategoriesList extends React.Component {

	constructor() {
		super();

		this.state = {
			tags: []
		}
	}

	componentWillMount() {
		this._getCategories();
	}

	render() {
		return (
			<fieldset>
				<h2>Categories</h2>
				<p>Add some tags to your recipe to make it easier to find later. Make sure you only add the recipe to relevant categories!</p>
				{this.state.tags}
			</fieldset>
		)
	}

	_getCategories() {
		jQuery.ajax({
			method: 'GET',
			url: 'https://meels-f1766.firebaseio.com/categories.json',
			success: (categories) => {
				this.setState({
					tags: categories.map((category, index) => {
						return (
							<Category type="checkbox" value={category} id={category} label={category} key={index} setTags={this.props.setTags} />
						)
					})
				})
			}
		})
	}
}