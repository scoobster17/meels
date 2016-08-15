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
				{this.state.tags}
			</fieldset>
		)
	}

	_getCategories() {
		jQuery.ajax({
			method: 'GET',
			url: 'https://meels-f1766.firebaseio.com/categories.json',
			success: (categories) => {
				console.log(categories);
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