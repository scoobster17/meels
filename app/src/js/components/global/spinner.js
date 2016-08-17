import React from 'react';

export default class Spinner extends React.Component {
	render() {
		return (
			<div className="spinner">
				<i className="icon-spin4 animate-spin"></i>
				<p>Loading&hellip;</p>
			</div>
		)
	}
}