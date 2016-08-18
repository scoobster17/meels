import React from 'react';

import {Urls} from '../../config/constants';
import {handleData} from '../../data/data-handling';
import CategoryOption from './category-option';

export default class CategorySelectors extends React.Component {

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
		handleData({
			method: 'GET',
			url: Urls.data.categories,
			success: (categories) => {
				this.setState({
					tags: categories.map((category, index) => {
						return (
							<CategoryOption type="checkbox" value={category.name} id={category.id} label={category.name} key={index} setTags={this.props.setTags} />
						)
					})
				})
			},
			error: () => {
				// TODO user feedback
				console.log('Error with data');
			}
		})
	}
}