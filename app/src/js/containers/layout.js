/******************************************************************************/
// DEPENDENCIES
/******************************************************************************/

// React
import React from 'react';
import ReactDOM from 'react-dom';
import GlobalHeader from '../components/global/global-header';
import GlobalFooter from '../components/global/global-footer';

/******************************************************************************/
// PAGE TEMPLATE CLASS
/******************************************************************************/

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<GlobalHeader />
				{
					// page content
					this.props.children
				}
				<GlobalFooter />
			</div>
		)
	}
}