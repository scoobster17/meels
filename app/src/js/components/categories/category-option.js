import React from 'react';

export default class CategoryOption extends React.Component {
	render() {
		return (
			<div className="field">
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input type={this.props.type} name="tags" id={this.props.id} value={this.props.value} onChange={this.props.setTags} />
			</div>
		)
	}
}