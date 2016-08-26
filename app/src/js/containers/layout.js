// React dependencies
import React from 'react';

// Redux dependencies
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../config/mapping.js';

// App dependencies
import GlobalHeader from '../components/global/global-header';
import GlobalFooter from '../components/global/global-footer';

/******************************************************************************/
// PAGE TEMPLATE CLASS
/******************************************************************************/

class Layout extends React.Component {
	render() {
		return (
			<div>
				<GlobalHeader />
				{
					// page content
					React.cloneElement(this.props.children, this.props)
				}
				<GlobalFooter />
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);