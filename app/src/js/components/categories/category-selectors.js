// React dependencies
import React from 'react';

// Redux dependencies
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../config/mapping.js';

// App dependencies
import {Urls} from '../../config/constants';
import {handleData} from '../../data/data-handling';
import CategoryOption from './category-option';
import Spinner from '../global/spinner';

class CategorySelectors extends React.Component {

	componentWillMount() {
		this._getCategories();
	}

	render() {
		return (
			<fieldset>
				<h2>Categories</h2>
				<p>Add some tags to your recipe to make it easier to find later. Make sure you only add the recipe to relevant categories!</p>
				{
					this.props.categories.list.length ?
						this.props.categories.list.map((category, index) => {
							return (
								<CategoryOption type="checkbox" value={category.name} id={category.id} label={category.name} key={index} setTags={this.props.setTags} />
							)
						})
					:
						<p>No categories found, please try again later or contact the app creator.</p>
				}
				{ this.props.categories.fetchingCategories && <Spinner /> }
			</fieldset>
		)
	}

	_getCategories() {

		this.props.fetchingCategories();

		handleData({
			method: 'GET',
			url: Urls.data.categories,
			success: (categories) => {
				this.props.categoriesReceived(categories);
			},
			error: () => {
				// TODO user feedback
				console.log('Error with data');
			}
		})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelectors);